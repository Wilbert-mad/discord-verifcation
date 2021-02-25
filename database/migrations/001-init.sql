-- Up
CREATE TABLE IF NOT EXISTS guildConfigs (
  ID TEXT NOT NULL PRIMARY KEY,
  ChannelId TEXT,
  ChannelVerifyingID TEXT,
  DeleteAV BOOLEAN DEFAULT true,
  VarifactionMode TEXT DEFAULT "noneOff",
  Roles TEXT DEFAULT "",
  AllowDM BOOLEAN DEFAULT false,
  DmMessage TEXT NOT NULL DEFAULT "{{user}} welcome to {{server}} you have been given the {{role}}",
  Message TEXT NOT NULL DEFAULT "welcome to {{server}}",
  Prefix TEXT DEFAULT ';',
  Language TEXT DEFAULT 'en-us'
);

-- Down
-- Drop TABLE guildConfigs