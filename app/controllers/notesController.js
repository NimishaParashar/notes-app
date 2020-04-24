const Note = require("../models/note");

module.exports.list = (req, res) => {
  // Note.find({ user: req.user._id })
  Note.find()
    .populate("category")
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.show = (req, res) => {
  const id = req.params.id;
  Note.findById(id)
    .populate("category")
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.create = (req, res) => {
  const { user } = req;
  const body = req.body;
  const note = new Note(body);
  note.user = user._id;
  note
    .save()
    .then((note) => {
      res.json({
        notice: "successfully created a note",
        note,
      });
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Note.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.destroy = (req, res) => {
  const id = req.params.id;
  Note.findByIdAndDelete(id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.json(err);
    });
};
