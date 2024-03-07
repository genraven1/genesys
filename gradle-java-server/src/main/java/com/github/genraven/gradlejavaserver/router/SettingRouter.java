package com.github.genraven.gradlejavaserver.router;

import com.github.genraven.gradlejavaserver.handler.SettingHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static com.github.genraven.gradlejavaserver.constants.SettingConstants.CURRENT;
import static com.github.genraven.gradlejavaserver.constants.SettingConstants.SETTING_PATH;

@Configuration
public class SettingRouter {

    @Bean
    public RouterFunction<ServerResponse> settingRouterMethod(final SettingHandler settingHandler) {
        return RouterFunctions.route()
                .path(SETTING_PATH, builder -> builder
                        .GET("/", settingHandler::getAllSettings)
                        .POST("/{name}", settingHandler::createSetting)
                        .GET("/{name}", settingHandler::getSetting)
                        .PUT("/{name}", settingHandler::updateSetting))
                .path(CURRENT, builder -> builder
                        .GET("/", settingHandler::getCurrentSetting)
                        .DELETE("/", settingHandler::removeCurrentSetting)
                        .POST("/{name}", settingHandler::setCurrentSetting))
                .build();
    }
}
