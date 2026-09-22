import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { PlantGraphic } from './Characters';
import { soundManager } from '../utils/audio';
import { User, Check, Plus, Trash2, X, School, Award, Sparkles } from 'lucide-react';
import {
  loadSavedStudentProfiles,
  saveCurrentStudentProfile,
  saveStudentProfilesList
} from '../utils/storage';

interface StudentProfileModalProps {
  currentProfile: StudentProfile;
  onSaveProfile: (profile: StudentProfile) => void;
  onClose: () => void;
}

const AVATAR_OPTIONS = [
  { type: 'sunflower', name: 'Bunga Matahari' },
  { type: 'peashooter', name: 'Penembak Persen' },
  { type: 'threepeater', name: 'Tiga Laras' },
  { type: 'iceshooter', name: 'Es Dingin' },
  { type: 'wallnut', name: 'Labu Perisai' },
  { type: 'potatomine', name: 'Ranjau Kentang' },
  { type: 'cherrybomb', name: 'Bom Ceri' }
];

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  currentProfile,
  onSaveProfile,
  onClose
}) => {
  const [profiles, setProfiles] = useState<StudentProfile[]>(loadSavedStudentProfiles());
  const [name, setName] = useState<string>(currentProfile.name);
  const [grade, setGrade] = useState<string>(currentProfile.grade || 'Kelas 4 SD');
  const [selectedAvatar, setSelectedAvatar] = useState<string>(currentProfile.avatar || 'sunflower');
  const [isEditingNew, setIsEditingNew] = useState<boolean>(false);

  const handleSave = () => {
    if (!name.trim()) return;
    soundManager.playClick();

    const updatedProfile: StudentProfile = {
      id: isEditingNew ? `student_${Date.now()}` : currentProfile.id,
      name: name.trim(),
      grade: grade.trim() || 'Kelas 4 SD',
      avatar: selectedAvatar,
      lastPlayed: new Date().toLocaleDateString('id-ID'),
      score: currentProfile.score || 0
    };

    saveCurrentStudentProfile(updatedProfile);
    onSaveProfile(updatedProfile);
    onClose();
  };

  const handleSelectExisting = (profile: StudentProfile) => {
    soundManager.playClick();
    setName(profile.name);
    setGrade(profile.grade);
    setSelectedAvatar(profile.avatar);
    setIsEditingNew(false);
    saveCurrentStudentProfile(profile);
    onSaveProfile(profile);
    onClose();
  };

  const handleDeleteProfile = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (profiles.length <= 1) return; // Keep at least one
    soundManager.playClick();
    const updated = profiles.filter((p) => p.id !== id);
    setProfiles(updated);
    saveStudentProfilesList(updated);
  };

  const handleAddNew = () => {
    soundManager.playClick();
    setName('');
    setGrade('Kelas 4-A');
    setSelectedAvatar('peashooter');
    setIsEditingNew(true);
  };

  return (
    <div id="student-profile-modal" className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="clay-card max-w-lg w-full p-4 sm:p-6 bg-white shadow-2xl animate-in zoom-in-95 duration-150 max-h-[95vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center">
              <User className="w-5 h-5 text-emerald-800" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 font-heading leading-tight">
                Data Pemain / Login Siswa
              </h3>
              <p className="text-xs font-semibold text-slate-500">
                Tersimpan di perangkat ini (HP, Laptop, atau Layar IFP)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Existing Profiles quick switcher */}
        {profiles.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black text-slate-700 font-heading">
                Pilih Akun yang Tersimpan di Perangkat:
              </span>
              <button
                onClick={handleAddNew}
                className="text-[11px] font-extrabold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Siswa Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {profiles.map((p) => {
                const isActive = p.id === currentProfile.id && !isEditingNew;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectExisting(p)}
                    className={`relative p-2 rounded-xl border-2 text-left flex items-center gap-2 transition-all ${
                      isActive
                        ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-300'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <div className="w-7 h-7 shrink-0">
                      <PlantGraphic type={p.avatar as any} className="w-7 h-7" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-black text-slate-800 truncate block font-heading">
                        {p.name}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 block truncate">
                        {p.grade}
                      </span>
                    </div>
                    {profiles.length > 1 && (
                      <button
                        onClick={(e) => handleDeleteProfile(e, p.id)}
                        className="text-slate-300 hover:text-rose-500 p-0.5"
                        title="Hapus Profil"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Edit / Input Form */}
        <div className="p-3 sm:p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-black text-emerald-950 font-heading">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{isEditingNew ? 'Data Siswa Baru:' : 'Sunting Data Siswa Aktif:'}</span>
          </div>

          {/* Name Field */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Nama Lengkap / Panggilan Siswa:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Desy Noerma"
              className="w-full px-3 py-2 text-sm font-bold rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
              maxLength={25}
            />
          </div>

          {/* Class / Grade Field */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Kelas / No. Absen:
            </label>
            <input
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              placeholder="Contoh: Kelas 4-A / Absen 12"
              className="w-full px-3 py-2 text-sm font-bold rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
              maxLength={25}
            />
          </div>

          {/* Avatar Choice */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Pilih Karakter Maskot Pemain:
            </label>
            <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
              {AVATAR_OPTIONS.map((av) => {
                const isSelected = selectedAvatar === av.type;
                return (
                  <button
                    key={av.type}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedAvatar(av.type);
                    }}
                    className={`p-1.5 rounded-xl border-2 shrink-0 flex flex-col items-center gap-1 transition-all ${
                      isSelected
                        ? 'border-emerald-500 bg-white ring-2 ring-emerald-400 scale-105'
                        : 'border-slate-200 bg-white/70 hover:bg-white'
                    }`}
                    title={av.name}
                  >
                    <div className="w-10 h-10 flex items-center justify-center">
                      <PlantGraphic type={av.type as any} className="w-9 h-9" />
                    </div>
                    <span className="text-[9px] font-black text-slate-700 truncate max-w-[50px]">
                      {av.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 mt-4 pt-2 border-t">
          <button
            type="button"
            onClick={onClose}
            className="clay-btn clay-btn-white px-4 py-2 text-xs sm:text-sm font-bold rounded-xl text-slate-600"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={!name.trim()}
            className="clay-btn clay-btn-green px-6 py-2 text-xs sm:text-sm font-black rounded-xl flex items-center gap-1.5 disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            <span>Simpan Data Pemain 💾</span>
          </button>
        </div>

      </div>
    </div>
  );
};
