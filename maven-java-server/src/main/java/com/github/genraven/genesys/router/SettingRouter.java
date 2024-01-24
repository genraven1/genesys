package com.github.genraven.genesys.router;

import com.github.genraven.genesys.handler.SettingHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static com.github.genraven.genesys.constants.SettingConstants.CURRENT;
import static com.github.genraven.genesys.constants.SettingConstants.SETTING_PATH;
@Configuration
public class SettingRouter {

    @Bean
    public RouterFunction<ServerResponse> settingRouter(final SettingHandler settingHandler) {
        return RouterFunctions.route()
                .path(SETTING_PATH, builder -> builder
                        .GET(settingHandler::getAllSettings)
                        .POST("{name}", settingHandler::createSetting)
                        .GET("{id}", settingHandler::getSettingById))
                .path(CURRENT, builder -> builder
                        .GET(settingHandler::getCurrentSetting))
                .build();
    }
}
