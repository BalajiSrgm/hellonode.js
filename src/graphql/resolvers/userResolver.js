
import User from '../../models/User'
import { PubSub, withFilter } from 'graphql-subscriptions'

const pubsub = new PubSub()

export default {
  user: (root, args) => {
    return new Promise((resolve, reject) => {
      User.findOne(root).exec((err, res) => {
        err ? reject(err) : resolve(res)
      })
    })
  },
  users: () => {
    return new Promise((resolve, reject) => {
      User.find({})
        .populate()
        .exec((err, res) => {
          err ? reject(err) : resolve(res)
        })
    })
  },
  addUser: (root, { id, name, email }) => {
    const newUser = new User(root)

    return new Promise((resolve, reject) => {
      newUser.save((err, res) => {
        if (err) reject(err)
        pubsub.publish('user', { user: res })
        resolve(res)
      })
    })
  },
  editUser: (root, { id, name, email }) => {
    console.log('<><>Args', root)
    return new Promise((resolve, reject) => {
      User.findOneAndUpdate({ id }, { $set: { name, email } }).exec(
        (err, res) => {
          err ? reject(err) : resolve(res)
        }
      )
    })
  },
  deleteUser: (root, args) => {
    return new Promise((resolve, reject) => {
      User.findOneAndRemove(args).exec((err, res) => {
        err ? reject(err) : resolve(res)
      })
    })
  },
  newUser: {
    subscribe: withFilter(() => pubsub.asyncIterator('user'), (res, variables) => {
      console.log('<><>variables', variables)
      console.log('res', res.user)
      return res.user.id === variables.id
    })
    // pubsub.subscribe( withFilter(() => pubsub.asyncIterator('user'), (res, variables) => {
    //   console.log('<><>variables', variables);
    //   console.log('res', res.user);
    //   return  res.user.id === variables.id;
    // }) )
    // pubsub.subscribe('user', (res) => {
    //   const a = pubsub.asyncIterator('user');
    //   console.log('<><>A', a);
    //   console.log('res', res.user);
    //   return res.user;
    // })
  },
  User: {
    id (user) {
      return user.id
    },
    name (user) {
      return user.name
    },
    email (user) {
      return user.email
    }
  }
}
