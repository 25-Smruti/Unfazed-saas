import React, { useState } from 'react';
import NoteEditor from '../../components/notes/NoteEditor';
import SoapTemplate from '../../components/notes/SoapTemplate';
import { useEntitlement } from '../../hooks/useEntitlement';
import Button from '../../components/common/Button';

export default function Notes() {
  const { checkEntitlement } = useEntitlement();
  const canUseSOAP = checkEntitlement('soap_templates');
  const [format, setFormat] = useState('freeform');
  const [content, setContent] = useState('');
  const [soapData, setSoapData] = useState({ subjective: '', objective: '', assessment: '', plan: '' });

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Clinical Documentation</h2>
        <div className="flex gap-2">
          <Button variant={format === 'freeform' ? 'primary' : 'secondary'} onClick={() => setFormat('freeform')}>
            Freeform
          </Button>
          <Button 
            variant={format === 'SOAP' ? 'primary' : 'secondary'} 
            onClick={() => canUseSOAP ? setFormat('SOAP') : alert('Upgrade plan for structured SOAP notes.')}
          >
            SOAP Template {!canUseSOAP && '(Pro Only)'}
          </Button>
        </div>
      </div>

      {format === 'freeform' ? (
        <NoteEditor content={content} onChange={setContent} />
      ) : (
        <SoapTemplate data={soapData} onChange={(k, v) => setSoapData({ ...soapData, [k]: v })} />
      )}
    </div>
  );
}
