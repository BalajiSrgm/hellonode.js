
import User from "../../models/User";

export default {
    user: (root, args) => {
        return new Promise((resolve, reject) => {
          User.findOne(root).exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
        });
      },
      users: () => {
        return new Promise((resolve, reject) => {
          User.find({})
            .populate()
            .exec((err, res) => {
              err ? reject(err) : resolve(res);
            });
        });
      },
  addUser: (root, { id, name, email }) => {
    const newUser = new User(root);

    return new Promise((resolve, reject) => {
      newUser.save((err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  },
  editUser: (root, { id, name, email }) => {
    console.log('<><>Args', root);
    return new Promise((resolve, reject) => {
      User.findOneAndUpdate({ id }, { $set: { name, email } }).exec(
        (err, res) => {
          err ? reject(err) : resolve(res);
        }
      );
    });
  },
  deleteUser: (root, args) => {
    return new Promise((resolve, reject) => {
      User.findOneAndRemove(args).exec((err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  },
  newUser:(root, args) => {
      return '';
  },
  User: {
    id(user) {
        return user.id;
    },
    name(user) {
        return user.name;
    },
    email(user) {
        return user.email;
    },
  }
};