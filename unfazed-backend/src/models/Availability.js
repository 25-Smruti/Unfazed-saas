import mongoose from 'mongoose';

const availabilitySchema = new mongoose.Schema(
  {
    therapist_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist', required: true, unique: true },
    bufferTimeMinutes: { type: Number, default: 15 },
    durationsAllowed: [{ type: Number, default: [30, 45, 60] }],
    weeklySchedule: [
      {
        dayOfWeek: { type: Number, required: true },
        slots: [
          {
            start: { type: String, required: true },
            end: { type: String, required: true }
          }
        ]
      }
    ],
    oneTimeOverrides: [
      {
        date: { type: String, required: true },
        isBlocked: { type: Boolean, default: true },
        slots: [{ start: String, end: String }]
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model('Availability', availabilitySchema);
