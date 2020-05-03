
import Event from "../../models/Event";

export default {
    event: (root, args) => {
        return new Promise((resolve, reject) => {
            Event.findOne(root).exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
        });
      },
      events: () => {
        return new Promise((resolve, reject) => {
            Event.find({})
            .populate()
            .exec((err, res) => {
              err ? reject(err) : resolve(res);
            });
        });
      },
  addEvent: (root, { id, name, email }) => {
    const newEvent = new Event(root);

    return new Promise((resolve, reject) => {
      newEvent.save((err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  },
  editEvent: (root, { id, name, email }) => {
    return new Promise((resolve, reject) => {
        Event.findOneAndUpdate({ id }, { $set: { name, email } }).exec(
        (err, res) => {
          err ? reject(err) : resolve(res);
        }
      );
    });
  },
  deleteEvent: (root, args) => {
    return new Promise((resolve, reject) => {
        Event.findOneAndRemove(args).exec((err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  },
  newEvent:(root, args) => {
      return '';
  },
  Event: {
    id(event) {
      return event._id;
    }
  }
};