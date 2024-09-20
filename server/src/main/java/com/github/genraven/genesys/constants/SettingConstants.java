package com.github.genraven.genesys.constants;

import static com.github.genraven.genesys.constants.CommonConstants.ID_WITH_BRACKETS;
import static com.github.genraven.genesys.constants.CommonConstants.NAME_WITH_BRACKETS;

public class SettingConstants {
    public static final String SETTING_PATH = "/settings";
    public static final String CURRENT = "/current";

    public static final String GET_SETTING_BY_ID = SETTING_PATH + ID_WITH_BRACKETS;
    public static final String CREATE_SETTING = SETTING_PATH + NAME_WITH_BRACKETS;
    public static final String CURRENT_SETTING = SETTING_PATH + "current/";
}
