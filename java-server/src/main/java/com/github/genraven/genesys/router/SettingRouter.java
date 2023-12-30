package com.github.genraven.genesys.router;

import com.github.genraven.genesys.constants.SettingConstants;
import com.github.genraven.genesys.handler.SettingHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class SettingRouter {

    @Bean
    public RouterFunction<ServerResponse> routeGetCurrentSetting(final SettingHandler settingHandler) {
        return RouterFunctions.route(RequestPredicates.GET(SettingConstants.CURRENT_SETTING), settingHandler::getSettingById);
    }
    @Bean
    public RouterFunction<ServerResponse> routeGetSettingById(final SettingHandler settingHandler) {
        return RouterFunctions.route(RequestPredicates.GET(SettingConstants.GET_SETTING_BY_ID), settingHandler::getSettingById);
    }

    @Bean
    public RouterFunction<ServerResponse> routeCreateSetting(final SettingHandler settingHandler) {
        return RouterFunctions.route(RequestPredicates.POST(SettingConstants.CREATE_SETTING), settingHandler::createSetting);
    }
}
