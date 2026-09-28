// Custom window event Arrival dispatches on exit; Header listens for it to
// flip its suppressed state back to visible. One shared constant avoids a
// duplicated string between the two files risking a silent typo.
export const ARRIVAL_COMPLETE_EVENT = "runavera:arrival-complete";
