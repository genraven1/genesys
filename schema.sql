DROP TABLE IF EXISTS Injury;
DROP TABLE IF EXISTS InjuryModification;
DROP TABLE IF EXISTS Campaign;
DROP TABLE IF EXISTS Party;
DROP TABLE IF EXISTS Session;
DROP TABLE IF EXISTS CampaignSession;
DROP TABLE IF EXISTS Talent;
DROP TABLE IF EXISTS TalentModification;
DROP TABLE IF EXISTS Ability;
DROP TABLE IF EXISTS AbilityModification;

CREATE TABLE IF NOT EXISTS Injury
(
    injury_id   INTEGER PRIMARY KEY,
    name        TEXT,
    description TEXT,
    severity    TEXT,
    min         INTEGER,
    max         INTEGER
);
CREATE TABLE IF NOT EXISTS InjuryModification
(
    injury_id   INTEGER,
    type        TEXT,
    ranks       INTEGER,
    FOREIGN KEY (injury_id) REFERENCES Injury (injury_id)
);
CREATE TABLE IF NOT EXISTS Campaign
(
    campaign_name TEXT PRIMARY KEY,
    party_name    TEXT,
    FOREIGN KEY (party_name) REFERENCES Party (party_name)
);
CREATE TABLE IF NOT EXISTS Party
(
    party_name TEXT PRIMARY KEY
);
CREATE TABLE IF NOT EXISTS Session
(
    session_name TEXT PRIMARY KEY
);
CREATE TABLE IF NOT EXISTS CampaignSession
(
    campaign_name TEXT,
    session_name  TEXT,
    FOREIGN KEY (campaign_name) REFERENCES Campaign (campaign_name),
    FOREIGN KEY (session_name) REFERENCES Session (session_name)
);
CREATE TABLE IF NOT EXISTS Talent
(
    talent_id   INTEGER PRIMARY KEY,
    name        TEXT,
    description TEXT,
    summary     TEXT,
    activation  TEXT,
    tier        TEXT,
    ranked      INTEGER
);
CREATE TABLE IF NOT EXISTS TalentModification
(
    talent_id   INTEGER,
    type        TEXT,
    ranks       INTEGER,
    FOREIGN KEY (talent_id) REFERENCES Talent (talent_id)
);