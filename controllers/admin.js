const Location = require('../models/location');
const User = require('../models/user');


exports.getLokasyonEkle = (req, res, next) => {
    if (req.session.user == null) {
        res.redirect('/404');
    }
    if (req.session.user.auth == 'admin') {
        res.render('admin/lokasyonekle', {
            title: 'Lokasyon Ekle',
            path: '/admin/lokasyonekle',
        });
    } else {
        res.redirect('/404');
    }
}

exports.postLokasyonEkle = (req, res, next) => {

    const location = new Location
    location.cityName = req.body.location

    location.save()
        .then(() => {
            res.redirect('/admin/lokasyonekle');
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getLokasyon = (req, res, next) => {
    if (req.session.user == null) {
        res.redirect('/404');
    }
    if (req.session.user.auth == 'admin') {
        Location
            .find()
            .then(locations => {
                res.render('admin/lokasyon', {
                    title: 'Lokasyon',
                    location: locations,
                    path: '/admin/lokasyon',
                    action: req.query.action
                });
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        res.redirect('/404');
    }
}

exports.getLokasyonDuzenle = (req, res, next) => {
    if (req.session.user == null) {
        res.redirect('/404');
    }
    if (req.session.user.auth == 'admin') {
        Location.findById(req.params.locationId)
            .then(locations => {
                res.render('admin/lokasyonduzenle', {
                    title: 'Lokasyon Duzenle',
                    location: locations,
                    path: '/admin/lokasyon'
                });
            })
            .catch(err => { console.log(err) });
    } else {
        res.redirect('/404');
    }
}

exports.postLokasyonDuzenle = (req, res, next) => {

    const id = req.body.id;
    const cityName = req.body.cityName;

    Location.updateOne({ _id: id }, {
        $set: {
            cityName: cityName,
        }
    }).then(() => {
        res.redirect('/admin/lokasyon?action=edit');
    }).catch(err => console.log(err));

}

exports.postDeleteLokasyon = (req, res, next) => {

    const id = req.body.locationId;

    Location.findByIdAndRemove(id)
        .then(() => {
            res.redirect('/admin/lokasyon?action=delete');
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getUser = (req, res, next) => {
    if (req.session.user == null) {
        res.redirect('/404');
    }
    if (req.session.user.auth == 'admin') {
        User
            .find()
            .then(user => {
                res.render('admin/user', {
                    title: 'User',
                    user: user,
                    path: '/admin/user',
                    action: req.query.action
                });
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        res.redirect('/404');
    }
}

exports.getKullaniciDuzenle = (req, res, next) => {
    if (req.session.user == null) {
        res.redirect('/404');
    }
    if (req.session.user.auth == 'admin') {
        User.findById(req.params.userId)
            .then(user => {
                res.render('admin/kullaniciduzenle', {
                    title: 'User Duzenle',
                    user: user,
                    path: '/admin/user'
                });
            })
            .catch(err => { console.log(err) });
    } else {
        res.redirect('/404');
    }
}

exports.postKullaniciDuzenle = (req, res, next) => {

    const id = req.body.id;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const auth = req.body.auth;

    User.updateOne({ _id: id }, {
        $set: {
            username: username,
            password: password,
            email: email,
            auth: auth
        }
    }).then(() => {
        res.redirect('/admin/user?action=edit');
    }).catch(err => console.log(err));

}

exports.postDeleteKullanici = (req, res, next) => {

    const id = req.body.userId;

    User.findByIdAndRemove(id)
        .then(() => {
            res.redirect('/admin/user?action=delete');
        })
        .catch(err => {
            console.log(err);
        });
}