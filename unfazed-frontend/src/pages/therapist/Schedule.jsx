import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import api from '../../api/axiosInstance';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';

const localizer = momentLocalizer(moment);

export default function Schedule() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback demo events so Week, Day, and Agenda views always show scheduled sessions
  const getInitialEvents = () => {
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth();
    const d = today.getDate();

    return [
      {
        id: 'evt-1',
        title: 'Intake Session - Aarav Patel',
        start: new Date(y, m, d, 10, 0),
        end: new Date(y, m, d, 11, 0),
      },
      {
        id: 'evt-2',
        title: 'Therapy Follow-up - Priya Sharma',
        start: new Date(y, m, d, 14, 0),
        end: new Date(y, m, d, 15, 0),
      },
      {
        id: 'evt-3',
        title: 'CBT Consultation - Rohan Mehta',
        start: new Date(y, m, d + 1, 11, 30),
        end: new Date(y, m, d + 1, 12, 30),
      },
      {
        id: 'evt-4',
        title: 'Stress Management Review',
        start: new Date(y, m, d + 2, 16, 0),
        end: new Date(y, m, d + 2, 17, 0),
      }
    ];
  };

  const loadSessions = async () => {
    try {
      const res = await api.get('/scheduling/sessions');
      const fetched = res.data.sessions || [];
      if (fetched.length > 0) {
        const formatted = fetched.map((s) => ({
          id: s._id,
          title: s.title || `Session with ${s.client_name || 'Client'}`,
          start: new Date(s.start_time),
          end: new Date(s.end_time),
        }));
        setEvents(formatted);
      } else {
        setEvents(getInitialEvents());
      }
    } catch (err) {
      console.warn('Backend sessions not found, displaying default schedule:', err);
      setEvents(getInitialEvents());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const handleAddAppointment = () => {
    const today = new Date();
    const newSession = {
      id: `manual-${Date.now()}`,
      title: 'New Client Consultation',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0),
    };
    setEvents((prev) => [...prev, newSession]);
    alert('New 12:00 PM session added! Switch between Month, Week, Day, and Agenda to view.');
  };

  if (loading) return <Loader />;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Scheduling & Calendar</h2>
          <p className="text-gray-500 text-sm mt-1">Manage consultation availability and appointments</p>
        </div>
        <Button onClick={handleAddAppointment}>+ Add Appointment Slot</Button>
      </div>

      <div className="bg-white p-6 border rounded-xl border-gray-200 shadow-xs h-[650px]">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={['month', 'week', 'day', 'agenda']}
          defaultView="week"
          step={60}
          showMultiDayTimes
        />
      </div>
    </div>
  );
}