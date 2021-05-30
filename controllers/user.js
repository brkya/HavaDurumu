const fetch = require('node-fetch');
const User = require('../models/user')
const Location = require('../models/location');
const Rapor = require('../models/rapor');

const url = 'https://api.openweathermap.org/data/2.5/weather?'
const key = '04e63c2fa307aa353131ceda94419eaa'


exports.postHavaDurumu = (req, res, next) => {
    let cityName = req.body.city.toLocaleLowerCase();
    let query = `${url}q=${cityName}&appid=${key}&units=metric&lang=tr`

    const rapor = new Rapor;

    Location
        .find()
        .then(locations => {
            fetch(query)
                .then(weather => {
                    return weather.json()
                })
                .then(weather => {
                    fetch('https://api.ipify.org/?format=json')
                        .then(ip => {
                            return ip.json();
                        })
                        .then(ip => {
                            let ipDatabase = ip.ip
                            const event = new Date();
                            rapor.userId = req.session.user._id;
                            rapor.username = req.session.user.username;
                            rapor.date = event;
                            rapor.lokasyonName = cityName;
                            rapor.ipAdress = ipDatabase;
                            rapor.save()
                        })

                    res.render('./havadurumu', {
                        title: 'Hava Durumu',
                        data: weather,
                        name: weather.name,
                        location: locations,
                        path: './havadurumu',
                        action: req.query.action
                    });
                })
                .catch((err) => {
                    console.log(err);
                });

        })
}

exports.getHavaDurumu = (req, res, next) => {

    if (req.session.user == null) {
        res.redirect('/404');
    }
    if (req.session.user.auth == 'standart' || req.session.user.auth == 'admin') {
        Location
            .find()
            .then(locations => {
                res.render('havadurumu', {
                    title: 'Hava Durumu',
                    location: locations,
                    path: '/havadurumu',
                });
            });
    } else {
        res.redirect('/404');
    }
}


exports.getRegister = (req, res, next) => {

    res.render('register', {
        title: 'Register',
        path: '/register',

    });
}


exports.postRegister = (req, res, next) => {
    const user = new User
    user.username = req.body.userName
    user.password = req.body.password
    user.email = req.body.email
    user.auth = 'standart'

    user.save()
        .then(() => {
            res.redirect('/login')
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getLogin = (req, res, next) => {
    res.render('login', {
        title: 'Login',
        path: '/login',

    });

}

exports.postLogin = (req, res, next) => {
    let userName = req.body.userName;

    User.findOne({ $or: [{ username: userName }] })
        .then(user => {
            if (user) {
                if (user.password == req.body.password) {
                    console.log('Şifre Doğru ')
                    req.session.isAuthenticated = true;
                    req.session.user = user;
                    console.log(req.session);
                    sessionName: req.session.username;
                    res.redirect('/havadurumu')
                } else {
                    console.log('Şifre Yanlış ')
                    res.redirect('/login');
                }
            }
            else {
                console.log('Böyle bir kullanici yok ')
                res.redirect('/login');
            }
        });

}


exports.getLogout = (req, res, next) => {
    req.session.destroy();
    res.redirect('/login');

}

exports.getRapor = (req, res, next) => {

    if (req.session.user == null) {
        res.redirect('/404');
    }
    if (req.session.user.auth == 'standart' || req.session.user.auth == 'admin') {
        Rapor
            .find()
            .then(rapor => {
                res.render('rapor', {
                    title: 'Rapor',
                    rapor: rapor,
                    path: '/rapor',

                });
            });
    } else {
        res.redirect('/404');
    }
}