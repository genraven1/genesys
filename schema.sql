DROP TABLE IF EXISTS Campaign;
DROP TABLE IF EXISTS Party;
DROP TABLE IF EXISTS Session;

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