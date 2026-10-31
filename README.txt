The Crease v8.6.194 — Shared League Tracker

Based on user-supplied v8.6.193. Replace index.html and recap-arena.png in the existing project, keeping all other project files.

BEFORE DEPLOYING: Read FIRESTORE_RULES_ADD.txt. Back up existing Firestore rules, add the three nested league collection permissions, then publish the rules. Do not replace the full rules file.

New league Firestore paths are team-scoped:
 teams/{teamId}/leagueScores/{gameId}
 teams/{teamId}/leagueLinks/{owhaTeamId}
 teams/{teamId}/leaguePredictions/{predictionId}

Scores, opponent links, and saved predictions now use realtime Firebase listeners and writes. League Tracker waits for shared data before displaying results to avoid accidentally mixing browser-local scores with cloud data. The original 84-matchup schedule is still bundled as a baseline; its known scheduling conflicts have not been resolved.

A manual 'Import this device’s older league edits' button migrates legacy browser-local score overrides, links and predictions. It skips IDs already present in Firebase and does not clear the old browser data. Import only from the device that has those older edits.

No writes to Katie's saved games, goalie records or Money Mode Bank are introduced by this feature. The app still displays Katie's goalie information through its existing read-only bridge.

TESTING: JavaScript syntax checked with node --check. Not tested with live Firebase accounts or deployed Vercel app. Please test with both accounts before relying on sync.
