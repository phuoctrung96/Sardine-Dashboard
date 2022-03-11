export interface BehaviorBiometricsPerFlow {
  flow: string;
  num_distraction_events: number;
  num_context_switch_events: number;
  fields: Array<BiometricField>;
  created_at: number;
  updated_at: number;
  num_context_switches: number;
  hesitation_percentile: HesitationPercentile;
  hesitations_percentage: HesitationsPercentage
}

interface HesitationPercentile {
  ltm: number;
  non_ltm: number;
}

interface HesitationsPercentage {
  amount: number;
  ltm: number;
}

export interface BiometricField {
  name: string;
  num_copy_paste_events: number;
  num_clipboard_events: number;
  num_auto_fill_events: number;
  num_expert_key_events: number;
  hesitation_percentage: number;
  is_ltm: boolean;
}
