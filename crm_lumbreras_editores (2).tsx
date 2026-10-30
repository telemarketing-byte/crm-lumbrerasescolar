import React, { useState, useMemo } from 'react';
import { 
  Building2, Phone, MessageSquare, Mail, Calendar as CalendarIcon, 
  Package, TrendingUp, Users, Search, Filter, Plus, CheckCircle, 
  Clock, AlertCircle, Eye, Edit, Trash2, Send, ChevronRight, BarChart3,
  BookOpen, MapPin, User, ChevronDown, RefreshCw, X, Download, Shield,
  Award, Check, LayoutDashboard, FileText
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, FunnelChart, Funnel, LabelList
} from 'recharts';

// Initial Mock Data
const INITIAL_SCHOOLS = [
  {
    id: 'SCH-001',
    name: 'Colegio San Agustín',
    type: 'Privado',
    department: 'Lima',
    district: 'San Isidro',
    levels: ['Primaria', 'Secundaria'],
    subjects: ['Matemática', 'Razonamiento Matemático', 'Comunicación'],
    studentCount: 1200,
    director: 'Dr. Roberto Mendoza',
    contactPerson: 'Prof. Carmen Silva (Jefa de Cátedra Matemática)',
    phone: '987654321',
    email: 'csilva@sanagustin.edu.pe',
    status: 'Cita Agendada',
    agent: 'Carlos Gutierrez',
    samplesSent: ['Colección MenteMat 1° a 6° Primaria', 'Razonamiento Matemático 1°-5° Sec'],
    lastContact: '2026-10-28',
    nextFollowUp: '2026-11-02',
    notes: 'Interesados en renovar el plan lector y la serie de matemática secundaria.'
  },
  {
    id: 'SCH-002',
    name: 'Inmaculada Concepción',
    type: 'Privado',
    department: 'Lima',
    district: 'Surco',
    levels: ['Primaria'],
    subjects: ['Comunicación', 'Razonamiento Verbal'],
    studentCount: 850,
    director: 'Sor Maria Luisa',
    contactPerson: 'Prof. Ana Torres (Coordinadora Académica)',
    phone: '912345678',
    email: 'atorres@inmaculada.edu.pe',
    status: 'Muestra Enviada',
    agent: 'Lucía Fernández',
    samplesSent: ['Comunicación Integral Primaria 1° a 6°'],
    lastContact: '2026-10-25',
    nextFollowUp: '2026-11-03',
    notes: 'Recibieron la muestra del kit de Comunicación. Pendiente evaluación por la junta docente.'
  },
  {
    id: 'SCH-003',
    name: 'Saco Oliveros - Sede Arequipa',
    type: 'Privado',
    department: 'Arequipa',
    district: 'Yanahuara',
    levels: ['Primaria', 'Secundaria'],
    subjects: ['Matemática', 'Razonamiento Matemático', 'Razonamiento Verbal'],
    studentCount: 1500,
    director: 'Ing. Fernando Ramos',
    contactPerson: 'Prof. Jorge Benavides',
    phone: '954321876',
    email: 'jbenavides@sacooliveros.edu.pe',
    status: 'Adopción Confirmada',
    agent: 'Carlos Gutierrez',
    samplesSent: ['Compendio Ciencias y Matemática Pre-U'],
    lastContact: '2026-10-20',
    nextFollowUp: '2026-11-15',
    notes: 'Confirmaron la compra de 450 guías didácticas de RM para 4to y 5to de Secundaria.'
  },
  {
    id: 'SCH-004',
    name: 'Claretiano de Trujillo',
    type: 'Privado',
    department: 'La Libertad',
    district: 'Trujillo',
    levels: ['Secundaria'],
    subjects: ['Comunicación', 'Razonamiento Verbal'],
    studentCount: 980,
    director: 'P. Miguel Ángel',
    contactPerson: 'Prof. Elena Rostagno',
    phone: '945678123',
    email: 'erostagno@claretianotrujillo.edu.pe',
    status: 'Llamada Realizada',
    agent: 'Mariana Ríos',
    samplesSent: [],
    lastContact: '2026-10-29',
    nextFollowUp: '2026-11-04',
    notes: 'Se presentó el catálogo digital 2027. Solicitaron muestra física de Razonamiento Verbal.'
  },
  {
    id: 'SCH-005',
    name: 'Prolog de Villa El Salvador',
    type: 'Privado',
    department: 'Lima',
    district: 'Villa El Salvador',
    levels: ['Primaria', 'Secundaria'],
    subjects: ['Matemática', 'Razonamiento Matemático'],
    studentCount: 1100,
    director: 'Lic. Marco Polo',
    contactPerson: 'Prof. David Aguilar',
    phone: '978123456',
    email: 'daguilar@colegioprolog.edu.pe',
    status: 'Nuevo Contacto',
    agent: 'Lucía Fernández',
    samplesSent: [],
    lastContact: '2026-10-15',
    nextFollowUp: '2026-11-01',
    notes: 'Primer contacto vía feria docente. Requiere visita promocional.'
  },
  {
    id: 'SCH-006',
    name: 'Trilce de Los Olivos',
    type: 'Privado',
    department: 'Lima',
    district: 'Los Olivos',
    levels: ['Primaria', 'Secundaria'],
    subjects: ['Matemática', 'Razonamiento Matemático', 'Comunicación', 'Razonamiento Verbal'],
    studentCount: 1800,
    director: 'Dr. Javier Paredes',
    contactPerson: 'Dra. Roxana Vizcarra',
    phone: '965412387',
    email: 'rvizcarra@trilce.edu.pe',
    status: 'Adopción Confirmada',
    agent: 'Mariana Ríos',
    samplesSent: ['Pack Completo Lumbreras Secundaria 2027'],
    lastContact: '2026-10-18',
    nextFollowUp: '2026-12-01',
    notes: 'Adopción total aprobada para la línea de Ciencias y Letras en Secundaria.'
  }
];

const INITIAL_INTERACTIONS = [
  {
    id: 'INT-101',
    schoolId: 'SCH-001',
    type: 'Llamada',
    agent: 'Carlos Gutierrez',
    date: '2026-10-28 10:30',
    summary: 'Llamada telefónica con la Prof. Carmen Silva. Se confirmó que recibieron los catálogos en PDF.',
    outcome: 'Agendado'
  },
  {
    id: 'INT-102',
    schoolId: 'SCH-002',
    type: 'WhatsApp',
    agent: 'Lucía Fernández',
    date: '2026-10-25 15:15',
    summary: 'Envío de número de guía de Olva Courier con el paquete de muestras.',
    outcome: 'Entregado'
  },
  {
    id: 'INT-103',
    schoolId: 'SCH-003',
    type: 'Cita Presencial',
    agent: 'Carlos Gutierrez',
    date: '2026-10-20 11:00',
    summary: 'Reunión presencial en la sede Yanahuara con el equipo directivo. Presentación de propuestas económicas.',
    outcome: 'Cierre Exitoso'
  }
];

const INITIAL_SAMPLES = [
  {
    id: 'SMP-301',
    schoolId: 'SCH-002',
    schoolName: 'Inmaculada Concepción',
    titles: 'Comunicación Integral Primaria 1° a 6°',
    recipient: 'Prof. Ana Torres',
    dispatchDate: '2026-10-22',
    deliveryStatus: 'Entregado',
    feedbackStatus: 'En revisión por comité'
  },
  {
    id: 'SMP-302',
    schoolId: 'SCH-001',
    schoolName: 'Colegio San Agustín',
    titles: 'Colección MenteMat 1° a 6° Primaria',
    recipient: 'Prof. Carmen Silva',
    dispatchDate: '2026-10-26',
    deliveryStatus: 'Entregado',
    feedbackStatus: 'Reunión programada para feedback'
  },
  {
    id: 'SMP-303',
    schoolId: 'SCH-004',
    schoolName: 'Claretiano de Trujillo',
    titles: 'Razonamiento Verbal Nivel Avanzado',
    recipient: 'Prof. Elena Rostagno',
    dispatchDate: '2026-10-29',
    deliveryStatus: 'En Tránsito',
    feedbackStatus: 'Pendiente de entrega'
  }
];

const AGENTS = ['Carlos Gutierrez', 'Lucía Fernández', 'Mariana Ríos', 'David Vargas'];
const SUBJECTS_LIST = ['Comunicación', 'Razonamiento Verbal', 'Matemática', 'Razonamiento Matemático'];
const STATUS_OPTIONS = ['Nuevo Contacto', 'Llamada Realizada', 'Cita Agendada', 'Muestra Enviada', 'Adopción Confirmada', 'Desestimado'];

export default function App() {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, schools, calendar, samples, reports
  const [schools, setSchools] = useState(INITIAL_SCHOOLS);
  const [interactions, setInteractions] = useState(INITIAL_INTERACTIONS);
  const [samples, setSamples] = useState(INITIAL_SAMPLES);

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('Todos');
  const [subjectFilter, setSubjectFilter] = useState('Todos');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [agentFilter, setAgentFilter] = useState('Todos');

  // Modals & Active Selections
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [showSchoolModal, setShowSchoolModal] = useState(false);
  const [showAddSchoolModal, setShowAddSchoolModal] = useState(false);
  const [showInteractionModal, setShowInteractionModal] = useState(false);
  const [showSampleModal, setShowSampleModal] = useState(false);

  // Form States
  const [newSchoolData, setNewSchoolData] = useState({
    name: '', type: 'Privado', department: 'Lima', district: '',
    levels: [], subjects: [], studentCount: 500, director: '',
    contactPerson: '', phone: '', email: '', status: 'Nuevo Contacto',
    agent: 'Carlos Gutierrez', notes: ''
  });

  const [newInteraction, setNewInteraction] = useState({
    type: 'Llamada', summary: '', outcome: 'Seguimiento', nextDate: ''
  });

  const [newSample, setNewSample] = useState({
    titles: '', recipient: '', dispatchDate: new Date().toISOString().split('T')[0]
  });

  // Derived KPI Calculations
  const metrics = useMemo(() => {
    const total = schools.length;
    const calls = interactions.filter(i => i.type === 'Llamada').length;
    const appointments = schools.filter(s => s.status === 'Cita Agendada').length;
    const samplesCount = samples.length;
    const confirmedAdoptions = schools.filter(s => s.status === 'Adopción Confirmada').length;
    const adoptionRate = total > 0 ? ((confirmedAdoptions / total) * 100).toFixed(1) : 0;

    return { total, calls, appointments, samplesCount, confirmedAdoptions, adoptionRate };
  }, [schools, interactions, samples]);

  // Filtered Schools Computation
  const filteredSchools = useMemo(() => {
    return schools.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            s.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            s.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            s.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLevel = levelFilter === 'Todos' || s.levels.includes(levelFilter);
      const matchesSubject = subjectFilter === 'Todos' || s.subjects.includes(subjectFilter);
      const matchesStatus = statusFilter === 'Todos' || s.status === statusFilter;
      const matchesAgent = agentFilter === 'Todos' || s.agent === agentFilter;

      return matchesSearch && matchesLevel && matchesSubject && matchesStatus && matchesAgent;
    });
  }, [schools, searchTerm, levelFilter, subjectFilter, statusFilter, agentFilter]);

  // Handle Add New School
  const handleCreateSchool = (e) => {
    e.preventDefault();
    const id = `SCH-00${schools.length + 1}`;
    const newEntry = {
      ...newSchoolData,
      id,
      samplesSent: [],
      lastContact: new Date().toISOString().split('T')[0],
      nextFollowUp: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    setSchools([newEntry, ...schools]);
    setShowAddSchoolModal(false);
    setNewSchoolData({
      name: '', type: 'Privado', department: 'Lima', district: '',
      levels: [], subjects: [], studentCount: 500, director: '',
      contactPerson: '', phone: '', email: '', status: 'Nuevo Contacto',
      agent: 'Carlos Gutierrez', notes: ''
    });
  };

  // Handle Log Interaction
  const handleAddInteraction = (e) => {
    e.preventDefault();
    if (!selectedSchool) return;

    const newLog = {
      id: `INT-${Date.now()}`,
      schoolId: selectedSchool.id,
      type: newInteraction.type,
      agent: selectedSchool.agent,
      date: new Date().toLocaleString('es-PE', { dateStyle: 'short', timeStyle: 'short' }),
      summary: newInteraction.summary,
      outcome: newInteraction.outcome
    };

    setInteractions([newLog, ...interactions]);

    // Update School Last Contact and Next Follow Up
    setSchools(schools.map(s => {
      if (s.id === selectedSchool.id) {
        return {
          ...s,
          lastContact: new Date().toISOString().split('T')[0],
          nextFollowUp: newInteraction.nextDate || s.nextFollowUp
        };
      }
      return s;
    }));

    setShowInteractionModal(false);
    setNewInteraction({ type: 'Llamada', summary: '', outcome: 'Seguimiento', nextDate: '' });
  };

  // Handle Register Sample
  const handleRegisterSample = (e) => {
    e.preventDefault();
    if (!selectedSchool) return;

    const sampleEntry = {
      id: `SMP-${Date.now()}`,
      schoolId: selectedSchool.id,
      schoolName: selectedSchool.name,
      titles: newSample.titles,
      recipient: newSample.recipient || selectedSchool.contactPerson,
      dispatchDate: newSample.dispatchDate,
      deliveryStatus: 'En Tránsito',
      feedbackStatus: 'Pendiente'
    };

    setSamples([sampleEntry, ...samples]);
    
    // Update school samples array & status if needed
    setSchools(schools.map(s => {
      if (s.id === selectedSchool.id) {
        return {
          ...s,
          status: 'Muestra Enviada',
          samplesSent: [...s.samplesSent, newSample.titles]
        };
      }
      return s;
    }));

    setShowSampleModal(false);
    setNewSample({ titles: '', recipient: '', dispatchDate: new Date().toISOString().split('T')[0] });
  };

  // Pre-configured WhatsApp Trigger
  const triggerWhatsApp = (phone, schoolName, contactPerson) => {
    const text = encodeURIComponent(
      `¡Hola ${contactPerson}! Le saluda su asesor educativo de *Lumbreras Editores*. Quería ponerme en contacto respecto al catálogo de libros para el *${schoolName}*. ¿Tendrá unos minutos para conversar?`
    );
    window.open(`https://wa.me/51${phone}?text=${text}`, '_blank');
  };

  // Pre-configured Mail Trigger
  const triggerEmail = (email, schoolName, contactPerson) => {
    const subject = encodeURIComponent(`Propuesta Pedagógica 2027 - Lumbreras Editores para ${schoolName}`);
    const body = encodeURIComponent(
      `Estimado(a) ${contactPerson},\n\nEs un gusto saludarle en representación de Lumbreras Editores.\nNos gustaría coordinar una breve reunión o envío de muestras físicas de nuestros textos de Matemática, Razonamiento Matemático, Comunicación y Razonamiento Verbal para el nivel Primaria y Secundaria.\n\nQuedamos a su atenta respuesta.\n\nAtentamente,\nEquipo Comercial - Lumbreras Editores`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  // Chart Data Calculations
  const statusChartData = useMemo(() => {
    const counts = {};
    STATUS_OPTIONS.forEach(st => counts[st] = 0);
    schools.forEach(s => {
      if (counts[s.status] !== undefined) counts[s.status]++;
    });
    return Object.keys(counts).map(key => ({ name: key, Colegios: counts[key] }));
  }, [schools]);

  const subjectChartData = useMemo(() => {
    const counts = { 'Matemática': 0, 'Razonamiento Matemático': 0, 'Comunicación': 0, 'Razonamiento Verbal': 0 };
    schools.forEach(s => {
      s.subjects.forEach(sub => {
        if (counts[sub] !== undefined) counts[sub]++;
      });
    });
    return Object.keys(counts).map(key => ({ name: key, Interesados: counts[key] }));
  }, [schools]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      
      {/* HEADER BAR */}
      <header className="bg-gradient-to-r from-red-900 via-rose-900 to-slate-900 text-white shadow-lg sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md border border-white/20">
              <BookOpen className="w-7 h-7 text-rose-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-bold text-xl tracking-tight text-white">LUMBRERAS EDITORES</h1>
                <span className="bg-amber-400 text-slate-900 text-xs font-black px-2 py-0.5 rounded-full uppercase tracking-wider">CRM Edu</span>
              </div>
              <p className="text-xs text-rose-200">Gestión Comercial & Adopción de Textos Escolares</p>
            </div>
          </div>

          {/* NAV TABS */}
          <nav className="flex items-center space-x-1 sm:space-x-2 bg-black/20 p-1 rounded-xl backdrop-blur-sm overflow-x-auto">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === 'dashboard' ? 'bg-white text-red-950 shadow-md font-semibold' : 'text-rose-100 hover:bg-white/10'}`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => setActiveTab('schools')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === 'schools' ? 'bg-white text-red-950 shadow-md font-semibold' : 'text-rose-100 hover:bg-white/10'}`}
            >
              <Building2 className="w-4 h-4" />
              <span>Colegios ({schools.length})</span>
            </button>
            <button 
              onClick={() => setActiveTab('calendar')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === 'calendar' ? 'bg-white text-red-950 shadow-md font-semibold' : 'text-rose-100 hover:bg-white/10'}`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Agenda Citas</span>
            </button>
            <button 
              onClick={() => setActiveTab('samples')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === 'samples' ? 'bg-white text-red-950 shadow-md font-semibold' : 'text-rose-100 hover:bg-white/10'}`}
            >
              <Package className="w-4 h-4" />
              <span>Muestras</span>
            </button>
            <button 
              onClick={() => setActiveTab('reports')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === 'reports' ? 'bg-white text-red-950 shadow-md font-semibold' : 'text-rose-100 hover:bg-white/10'}`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Reportes</span>
            </button>
          </nav>

          <button 
            onClick={() => setShowAddSchoolModal(true)}
            className="flex items-center space-x-2 bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Colegio</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow w-full">

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* KPI STAT CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-red-300 transition-all">
                <div className="flex justify-between items-start text-slate-500">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total Colegios</span>
                  <div className="p-2 bg-red-50 text-red-700 rounded-lg"><Building2 className="w-4 h-4" /></div>
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-black text-slate-800">{metrics.total}</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">En cartera activa</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-all">
                <div className="flex justify-between items-start text-slate-500">
                  <span className="text-xs font-semibold uppercase tracking-wider">Llamadas</span>
                  <div className="p-2 bg-blue-50 text-blue-700 rounded-lg"><Phone className="w-4 h-4" /></div>
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-black text-slate-800">{metrics.calls}</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">Gestiones registradas</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-amber-300 transition-all">
                <div className="flex justify-between items-start text-slate-500">
                  <span className="text-xs font-semibold uppercase tracking-wider">Citas Agendadas</span>
                  <div className="p-2 bg-amber-50 text-amber-700 rounded-lg"><CalendarIcon className="w-4 h-4" /></div>
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-black text-slate-800">{metrics.appointments}</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">Reuniones pendientes</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-purple-300 transition-all">
                <div className="flex justify-between items-start text-slate-500">
                  <span className="text-xs font-semibold uppercase tracking-wider">Muestras</span>
                  <div className="p-2 bg-purple-50 text-purple-700 rounded-lg"><Package className="w-4 h-4" /></div>
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-black text-slate-800">{metrics.samplesCount}</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">Packs de libros enviados</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-emerald-300 transition-all">
                <div className="flex justify-between items-start text-slate-500">
                  <span className="text-xs font-semibold uppercase tracking-wider">Adopciones</span>
                  <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg"><Award className="w-4 h-4" /></div>
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-black text-slate-800">{metrics.confirmedAdoptions}</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">Colegios cerrados</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-900 to-rose-800 text-white p-4 rounded-xl shadow-md flex flex-col justify-between">
                <div className="flex justify-between items-start opacity-80">
                  <span className="text-xs font-semibold uppercase tracking-wider">Tasa Adopción</span>
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-black">{metrics.adoptionRate}%</span>
                  <p className="text-[10px] text-rose-200 mt-0.5">Efectividad total</p>
                </div>
              </div>
            </div>

            {/* MAIN DASHBOARD CONTENT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* STATUS EMBUDO / FUNNEL OVERVIEW */}
              <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm sm:text-base">
                    <BarChart3 className="w-5 h-5 text-red-800" />
                    Estado del Funnel de Adopción Lumbreras
                  </h3>
                  <span className="text-xs text-slate-400">Actualizado hoy</span>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statusChartData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" />
                      <YAxis tick={{ fontSize: 11 }} />
                      <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                      <Bar dataKey="Colegios" fill="#9f1239" radius={[6, 6, 0, 0]} barSize={36} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* QUICK ACTION BANNER & RECENT ACTIVITIES */}
              <div className="space-y-4">
                
                {/* MATERIAS DE INTERES */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-rose-700" />
                    Demanda por Asignatura
                  </h3>
                  <div className="space-y-3">
                    {subjectChartData.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-slate-700">{item.name}</span>
                          <span className="font-bold text-slate-900">{item.Interesados} colegios</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div 
                            className="bg-rose-800 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(item.Interesados / (metrics.total || 1)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PRÓXIMOS SEGUIMIENTOS CRÍTICOS */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-600" />
                      Próximos Seguimientos
                    </h3>
                    <button 
                      onClick={() => setActiveTab('calendar')} 
                      className="text-xs text-rose-800 font-semibold hover:underline"
                    >
                      Ver todos
                    </button>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {schools.slice(0, 3).map(s => (
                      <div key={s.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-slate-800">{s.name}</p>
                          <p className="text-[11px] text-slate-500">{s.contactPerson}</p>
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold text-[10px]">
                            {s.nextFollowUp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* TABLA RESUMEN RÁPIDO */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800 text-base">Colegios con Gestión Reciente</h3>
                <button 
                  onClick={() => setActiveTab('schools')}
                  className="text-xs font-semibold text-rose-800 hover:text-rose-950 flex items-center gap-1"
                >
                  Ir al Listado Completo <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 bg-slate-50">
                      <th className="p-3">Colegio</th>
                      <th className="p-3">Ubicación</th>
                      <th className="p-3">Contacto Directo</th>
                      <th className="p-3">Estado</th>
                      <th className="p-3">Promotor</th>
                      <th className="p-3 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {schools.slice(0, 5).map(school => (
                      <tr key={school.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-bold text-slate-900">{school.name}</td>
                        <td className="p-3 text-slate-600">{school.district}, {school.department}</td>
                        <td className="p-3">
                          <div className="font-medium text-slate-800">{school.contactPerson}</div>
                          <div className="text-[11px] text-slate-400">{school.phone}</div>
                        </td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            school.status === 'Adopción Confirmada' ? 'bg-emerald-100 text-emerald-800' :
                            school.status === 'Cita Agendada' ? 'bg-amber-100 text-amber-800' :
                            school.status === 'Muestra Enviada' ? 'bg-purple-100 text-purple-800' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {school.status}
                          </span>
                        </td>
                        <td className="p-3 text-slate-600">{school.agent}</td>
                        <td className="p-3 text-right space-x-1">
                          <button 
                            onClick={() => { setSelectedSchool(school); setShowSchoolModal(true); }}
                            className="p-1.5 text-slate-600 hover:text-rose-800 hover:bg-slate-100 rounded-lg transition-all"
                            title="Ver Perfil Detallado"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => triggerWhatsApp(school.phone, school.name, school.contactPerson)}
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                            title="WhatsApp Rápido"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* SCHOOLS DIRECTORY TAB */}
        {activeTab === 'schools' && (
          <div className="space-y-4">
            
            {/* FILTERS & SEARCH BAR */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
                
                {/* Search Box */}
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text"
                    placeholder="Buscar colegio, ciudad, contacto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-rose-800"
                  />
                  {searchTerm && (
                    <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filter selects */}
                <div className="flex flex-wrap gap-2 w-full md:w-auto items-center">
                  <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold mr-1">
                    <Filter className="w-3.5 h-3.5" />
                    <span>Filtros:</span>
                  </div>

                  {/* Level */}
                  <select 
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-xs rounded-xl px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-rose-800"
                  >
                    <option value="Todos">Nivel: Todos</option>
                    <option value="Primaria">Primaria</option>
                    <option value="Secundaria">Secundaria</option>
                  </select>

                  {/* Subject */}
                  <select 
                    value={subjectFilter}
                    onChange={(e) => setSubjectFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-xs rounded-xl px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-rose-800"
                  >
                    <option value="Todos">Materia: Todas</option>
                    {SUBJECTS_LIST.map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>

                  {/* Status */}
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-xs rounded-xl px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-rose-800"
                  >
                    <option value="Todos">Estado: Todos</option>
                    {STATUS_OPTIONS.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>

                  {/* Agent */}
                  <select 
                    value={agentFilter}
                    onChange={(e) => setAgentFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-xs rounded-xl px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-rose-800"
                  >
                    <option value="Todos">Promotor: Todos</option>
                    {AGENTS.map(ag => (
                      <option key={ag} value={ag}>{ag}</option>
                    ))}
                  </select>

                </div>

              </div>
            </div>

            {/* RESULTS TABLE */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center text-xs text-slate-500">
                <span>Mostrando <strong className="text-slate-800">{filteredSchools.length}</strong> colegios registrados</span>
                <span className="hidden sm:inline">Haz clic en un colegio para abrir su ficha completa</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 bg-slate-50/80">
                      <th className="p-3.5">Colegio / Dirección</th>
                      <th className="p-3.5">Niveles & Materias</th>
                      <th className="p-3.5">Contacto Principal</th>
                      <th className="p-3.5">Estado Etapa</th>
                      <th className="p-3.5">Promotor Asignado</th>
                      <th className="p-3.5 text-center">Canales</th>
                      <th className="p-3.5 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredSchools.length > 0 ? (
                      filteredSchools.map(school => (
                        <tr key={school.id} className="hover:bg-rose-50/30 transition-colors group">
                          
                          <td className="p-3.5">
                            <div className="font-bold text-slate-900 group-hover:text-rose-900 transition-colors">
                              {school.name}
                            </div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              {school.district}, {school.department} • <span className="font-medium">{school.studentCount} alumn.</span>
                            </div>
                          </td>

                          <td className="p-3.5 max-w-xs">
                            <div className="flex flex-wrap gap-1 mb-1">
                              {school.levels.map(lvl => (
                                <span key={lvl} className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[10px] font-semibold">
                                  {lvl}
                                </span>
                              ))}
                            </div>
                            <div className="text-[10px] text-slate-500 truncate">
                              {school.subjects.join(', ')}
                            </div>
                          </td>

                          <td className="p-3.5">
                            <div className="font-semibold text-slate-800">{school.contactPerson}</div>
                            <div className="text-[11px] text-slate-500">{school.phone}</div>
                          </td>

                          <td className="p-3.5">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-block ${
                              school.status === 'Adopción Confirmada' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                              school.status === 'Cita Agendada' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                              school.status === 'Muestra Enviada' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                              school.status === 'Llamada Realizada' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                              'bg-slate-100 text-slate-700'
                            }`}>
                              {school.status}
                            </span>
                          </td>

                          <td className="p-3.5 text-slate-700 font-medium">
                            {school.agent}
                          </td>

                          <td className="p-3.5 text-center">
                            <div className="flex justify-center items-center gap-1">
                              <button 
                                onClick={() => triggerWhatsApp(school.phone, school.name, school.contactPerson)}
                                className="p-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-lg transition-all"
                                title="Enviar WhatsApp"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => triggerEmail(school.email, school.name, school.contactPerson)}
                                className="p-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-lg transition-all"
                                title="Enviar Correo Corporativo"
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>

                          <td className="p-3.5 text-right">
                            <button 
                              onClick={() => { setSelectedSchool(school); setShowSchoolModal(true); }}
                              className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-900 hover:text-white text-rose-900 font-bold rounded-lg text-xs transition-all shadow-sm"
                            >
                              Ver Ficha
                            </button>
                          </td>

                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="p-8 text-center text-slate-400">
                          No se encontraron colegios que coincidan con los criterios de búsqueda.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* CALENDAR & AGENDA TAB */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Agenda de Seguimientos y Citas Presenciales</h2>
                  <p className="text-xs text-slate-500">Planificación de llamadas de retorno y reuniones de presentación de libros</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Proximidad de fechas
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {schools.map(school => (
                  <div key={school.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] uppercase font-bold text-rose-800 tracking-wider bg-rose-50 px-2 py-0.5 rounded">
                          {school.status}
                        </span>
                        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                          <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
                          {school.nextFollowUp}
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-sm">{school.name}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">{school.contactPerson}</p>
                      
                      <div className="mt-3 text-xs text-slate-500 bg-white p-2.5 rounded-lg border border-slate-100">
                        <span className="font-semibold text-slate-700">Observaciones: </span>
                        {school.notes || 'Sin notas adicionales.'}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Promotor: {school.agent}</span>
                      <button 
                        onClick={() => {
                          setSelectedSchool(school);
                          setShowInteractionModal(true);
                        }}
                        className="text-rose-900 hover:text-rose-700 font-bold flex items-center gap-1"
                      >
                        Registrar Llamada <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* SAMPLES MODULE TAB */}
        {activeTab === 'samples' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Package className="w-5 h-5 text-purple-700" />
                    Control y Envíos de Muestras Promocionales
                  </h2>
                  <p className="text-xs text-slate-500">Registro de entrega de paquetes pedagógicos a coordinadores y directores</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 bg-slate-50">
                      <th className="p-3">Colegio</th>
                      <th className="p-3">Títulos / Textos Enviados</th>
                      <th className="p-3">Destinatario</th>
                      <th className="p-3">Fecha Despacho</th>
                      <th className="p-3">Estado Envío</th>
                      <th className="p-3">Feedback Docente</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {samples.map(sample => (
                      <tr key={sample.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-bold text-slate-900">{sample.schoolName}</td>
                        <td className="p-3 font-medium text-slate-800">{sample.titles}</td>
                        <td className="p-3 text-slate-600">{sample.recipient}</td>
                        <td className="p-3 text-slate-500">{sample.dispatchDate}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            sample.deliveryStatus === 'Entregado' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {sample.deliveryStatus}
                          </span>
                        </td>
                        <td className="p-3 text-slate-600">{sample.feedbackStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        )}

        {/* REPORTS & ANALYTICS TAB */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Report Chart 1 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-red-800" />
                  Distribución de Etapas por Colegio
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statusChartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 9 }} interval={0} angle={-10} textAnchor="end" />
                      <YAxis tick={{ fontSize: 10 }} />
                      <RechartsTooltip />
                      <Bar dataKey="Colegios" fill="#881337" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Report Chart 2 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-rose-700" />
                  Interés por Asignaturas Especializadas
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={subjectChartData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 10 }} />
                      <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={120} />
                      <RechartsTooltip />
                      <Bar dataKey="Interesados" fill="#be123c" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-4 px-6 text-center text-xs border-t border-slate-800 mt-auto">
        <p>© 2026 Lumbreras Editores — CRM de Gestión Pedagógica & Comercial de Colegios Privados</p>
      </footer>

      {/* MODAL: VER FICHA COMPLETA DEL COLEGIO */}
      {showSchoolModal && selectedSchool && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
            
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-red-900 to-slate-900 text-white flex justify-between items-start sticky top-0 z-10">
              <div>
                <span className="text-[10px] font-extrabold uppercase bg-rose-500/30 text-rose-200 px-2.5 py-0.5 rounded-full border border-rose-400/20">
                  {selectedSchool.id}
                </span>
                <h2 className="text-xl font-bold mt-1 text-white">{selectedSchool.name}</h2>
                <p className="text-xs text-rose-200 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {selectedSchool.district}, {selectedSchool.department} • Alumnos: {selectedSchool.studentCount}
                </p>
              </div>
              <button 
                onClick={() => setShowSchoolModal(false)}
                className="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              
              {/* Quick Action Bar */}
              <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/80 items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">Acciones Directas Multicanal:</span>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => triggerWhatsApp(selectedSchool.phone, selectedSchool.name, selectedSchool.contactPerson)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-all shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                  <button 
                    onClick={() => triggerEmail(selectedSchool.email, selectedSchool.name, selectedSchool.contactPerson)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-all shadow-sm"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Correo</span>
                  </button>
                  <button 
                    onClick={() => setShowInteractionModal(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-800 hover:bg-rose-900 text-white rounded-lg text-xs font-semibold transition-all shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Registrar Llamada</span>
                  </button>
                  <button 
                    onClick={() => setShowSampleModal(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-semibold transition-all shadow-sm"
                  >
                    <Package className="w-3.5 h-3.5" />
                    <span>Enviar Muestra</span>
                  </button>
                </div>
              </div>

              {/* Data Grid Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-rose-900 border-b border-slate-200 pb-1">Información de Contacto</h4>
                  <p><strong className="text-slate-700">Director(a):</strong> {selectedSchool.director}</p>
                  <p><strong className="text-slate-700">Contacto Directo:</strong> {selectedSchool.contactPerson}</p>
                  <p><strong className="text-slate-700">Teléfono:</strong> {selectedSchool.phone}</p>
                  <p><strong className="text-slate-700">Email:</strong> {selectedSchool.email}</p>
                </div>

                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-rose-900 border-b border-slate-200 pb-1">Perfil Pedagógico</h4>
                  <p><strong className="text-slate-700">Niveles Educativos:</strong> {selectedSchool.levels.join(', ')}</p>
                  <p><strong className="text-slate-700">Asignaturas de Interés:</strong> {selectedSchool.subjects.join(', ')}</p>
                  <p><strong className="text-slate-700">Promotor Asignado:</strong> {selectedSchool.agent}</p>
                  <p><strong className="text-slate-700">Etapa Actual:</strong> <span className="font-bold text-rose-900">{selectedSchool.status}</span></p>
                </div>
              </div>

              {/* Historial de Interacciones */}
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-600" />
                  Historial de Interacciones & Gestión
                </h4>
                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {interactions.filter(i => i.schoolId === selectedSchool.id).length > 0 ? (
                    interactions.filter(i => i.schoolId === selectedSchool.id).map(i => (
                      <div key={i.id} className="p-3 rounded-xl border border-slate-200 bg-white text-xs space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-slate-800 flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] uppercase">{i.type}</span>
                            {i.agent}
                          </span>
                          <span className="text-[11px] text-slate-400">{i.date}</span>
                        </div>
                        <p className="text-slate-600">{i.summary}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl">No hay interacciones recientes registradas para este colegio.</p>
                  )}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button 
                onClick={() => setShowSchoolModal(false)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-xl text-xs transition-all"
              >
                Cerrar Ficha
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL: NUEVO COLEGIO */}
      {showAddSchoolModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            
            <div className="p-5 bg-rose-900 text-white flex justify-between items-center sticky top-0 z-10">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Building2 className="w-5 h-5" /> Registrar Nuevo Colegio
              </h3>
              <button onClick={() => setShowAddSchoolModal(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSchool} className="p-6 space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nombre del Colegio *</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Ej. Colegio Monserrat"
                    value={newSchoolData.name}
                    onChange={e => setNewSchoolData({...newSchoolData, name: e.target.value})}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-800"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nº Estimado de Alumnos</label>
                  <input 
                    type="number" 
                    value={newSchoolData.studentCount}
                    onChange={e => setNewSchoolData({...newSchoolData, studentCount: parseInt(e.target.value) || 0})}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Departamento</label>
                  <input 
                    type="text" 
                    value={newSchoolData.department}
                    onChange={e => setNewSchoolData({...newSchoolData, department: e.target.value})}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-800"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Distrito / Provincia</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Ej. Los Olivos"
                    value={newSchoolData.district}
                    onChange={e => setNewSchoolData({...newSchoolData, district: e.target.value})}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Contacto Principal (Profesor/Coordinador) *</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Ej. Prof. Juan Pérez"
                    value={newSchoolData.contactPerson}
                    onChange={e => setNewSchoolData({...newSchoolData, contactPerson: e.target.value})}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-800"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Teléfono / WhatsApp *</label>
                  <input 
                    required
                    type="text" 
                    placeholder="999888777"
                    value={newSchoolData.phone}
                    onChange={e => setNewSchoolData({...newSchoolData, phone: e.target.value})}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Correo Electrónico</label>
                  <input 
                    type="email" 
                    placeholder="contacto@colegio.edu.pe"
                    value={newSchoolData.email}
                    onChange={e => setNewSchoolData({...newSchoolData, email: e.target.value})}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-800"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Promotor Educativo Asignado</label>
                  <select 
                    value={newSchoolData.agent}
                    onChange={e => setNewSchoolData({...newSchoolData, agent: e.target.value})}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-800"
                  >
                    {AGENTS.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Niveles Educativos</label>
                <div className="flex gap-4">
                  {['Primaria', 'Secundaria'].map(lvl => (
                    <label key={lvl} className="flex items-center gap-1.5 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={newSchoolData.levels.includes(lvl)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewSchoolData({...newSchoolData, levels: [...newSchoolData.levels, lvl]});
                          } else {
                            setNewSchoolData({...newSchoolData, levels: newSchoolData.levels.filter(l => l !== lvl)});
                          }
                        }}
                        className="rounded text-rose-800 focus:ring-rose-800"
                      />
                      <span>{lvl}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Asignaturas de Interés</label>
                <div className="grid grid-cols-2 gap-2">
                  {SUBJECTS_LIST.map(sub => (
                    <label key={sub} className="flex items-center gap-1.5 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={newSchoolData.subjects.includes(sub)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewSchoolData({...newSchoolData, subjects: [...newSchoolData.subjects, sub]});
                          } else {
                            setNewSchoolData({...newSchoolData, subjects: newSchoolData.subjects.filter(s => s !== sub)});
                          }
                        }}
                        className="rounded text-rose-800 focus:ring-rose-800"
                      />
                      <span>{sub}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddSchoolModal(false)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-semibold"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-rose-900 hover:bg-rose-800 text-white font-bold rounded-xl shadow-md"
                >
                  Guardar Colegio
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL: REGISTRAR INTERACCIÓN / LLAMADA */}
      {showInteractionModal && selectedSchool && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Phone className="w-5 h-5 text-rose-800" />
                Registrar Gestión: {selectedSchool.name}
              </h3>
              <button onClick={() => setShowInteractionModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddInteraction} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Tipo de Canal</label>
                <select 
                  value={newInteraction.type}
                  onChange={e => setNewInteraction({...newInteraction, type: e.target.value})}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="Llamada">Llamada Telefónica</option>
                  <option value="WhatsApp">Mensaje WhatsApp</option>
                  <option value="Correo">Correo Electrónico</option>
                  <option value="Cita Presencial">Cita Presencial</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Resumen de la Conversación / Acuerdos</label>
                <textarea 
                  required
                  rows="3"
                  placeholder="Detallar la respuesta del profesor o coordinador..."
                  value={newInteraction.summary}
                  onChange={e => setNewInteraction({...newInteraction, summary: e.target.value})}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-800"
                ></textarea>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Próxima Fecha de Seguimiento</label>
                <input 
                  type="date" 
                  value={newInteraction.nextDate}
                  onChange={e => setNewInteraction({...newInteraction, nextDate: e.target.value})}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowInteractionModal(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-800 rounded-xl font-semibold"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-rose-900 text-white font-bold rounded-xl shadow-md"
                >
                  Guardar Gestión
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: REGISTRAR MUESTRA DE LIBROS */}
      {showSampleModal && selectedSchool && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-700" />
                Envío de Muestra Promocional
              </h3>
              <button onClick={() => setShowSampleModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterSample} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Colegio Destino</label>
                <input type="text" disabled value={selectedSchool.name} className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 font-bold" />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Títulos / Series de Libros *</label>
                <input 
                  required
                  type="text" 
                  placeholder="Ej. Serie MenteMat Primaria + Raz. Verbal Sec."
                  value={newSample.titles}
                  onChange={e => setNewSample({...newSample, titles: e.target.value})}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Destinatario Directo</label>
                <input 
                  type="text" 
                  placeholder={selectedSchool.contactPerson}
                  value={newSample.recipient}
                  onChange={e => setNewSample({...newSample, recipient: e.target.value})}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowSampleModal(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-800 rounded-xl font-semibold"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-purple-700 text-white font-bold rounded-xl shadow-md"
                >
                  Registrar Despacho
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}