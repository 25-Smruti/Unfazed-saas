import mongoose from 'mongoose';

const sessionNoteSchema = new mongoose.Schema(
  {
    session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
    therapist_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist', required: true },
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    type: { type: String, enum: ['private', 'shared'], required: true },
    templateFormat: { type: String, enum: ['freeform', 'SOAP', 'DAP'], default: 'freeform' },
    content: { type: String, default: '' },
    structuredContent: {
      subjective: { type: String, default: '' },
      objective: { type: String, default: '' },
      assessment: { type: String, default: '' },
      plan: { type: String, default: '' }
    }
  },
  { timestamps: true }
);

export default mongoose.model('SessionNote', sessionNoteSchema);
