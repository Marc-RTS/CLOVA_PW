type StatusName = 'Pending' | 'OnTrack' | 'AtRisk' | 'OffTrack' | 'Threshold' | 'Trigger' | 'Good';

interface StatusInfo {
  id: number;
  name: string;
  bgcolor: string;
  color: string;
}

const statusx: Record<StatusName, StatusInfo> = {
  Pending: { id: 1, name: 'Pending', bgcolor: '', color: '' },
  OnTrack: { id: 2, name: 'OnTrack', bgcolor: '', color: '' },
  AtRisk: { id: 3, name: 'AtRisk', bgcolor: '', color: '' },
  OffTrack: { id: 4, name: 'OffTrack', bgcolor: '', color: '' },
  Threshold: { id: 5, name: 'Threshold', bgcolor: '', color: '' },
  Trigger: { id: 6, name: 'Trigger', bgcolor: '', color: '' },
  Good: { id: 7, name: 'Good', bgcolor: '', color: '' },
};
