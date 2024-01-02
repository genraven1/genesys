package com.github.genraven.genesys.router;

import com.github.genraven.genesys.constants.SettingConstants;
import com.github.genraven.genesys.handler.SettingHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static com.github.genraven.genesys.constants.CommonConstants.ID_WITH_BRACKETS;
import static com.github.genraven.genesys.constants.SettingConstants.CURRENT;

@Configuration
public class SettingRouter {

    @Bean
    RouterFunction<ServerResponse> settingRoutes(final SettingHandler settingHandler) {
        return RouterFunctions.route().path(SettingConstants.SETTING_PATH, builder -> builder
                .GET(ID_WITH_BRACKETS, settingHandler::getSettingById))
                .GET(CURRENT, settingHandler::getCurrentSetting)
                .GET(settingHandler::getAllSettings)
                .POST(settingHandler::createSetting)
                .build();
    }
}
