import SessionNote from '../models/SessionNote.js';

export const createOrUpdateNote = async (req, res, next) => {
  try {
    const { session_id, client_id, type, templateFormat, content, structuredContent } = req.body;
    const note = await SessionNote.findOneAndUpdate(
      { session_id, type },
      {
        session_id,
        therapist_id: req.user.id,
        client_id,
        type,
        templateFormat,
        content,
        structuredContent
      },
      { upsert: true, new: true }
    );
    res.json({ success: true, note });
  } catch (err) {
    next(err);
  }
};

export const getNotesByClient = async (req, res, next) => {
  try {
    const { clientId } = req.params;
    const isTherapist = !!req.user;

    const filter = { client_id: clientId };
    if (!isTherapist) {
      filter.type = 'shared';
    } else {
      filter.therapist_id = req.user.id;
    }

    const notes = await SessionNote.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, notes });
  } catch (err) {
    next(err);
  }
};
