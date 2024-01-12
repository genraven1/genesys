package com.github.genraven.genesys.router;

import com.github.genraven.genesys.constants.SettingConstants;
import com.github.genraven.genesys.handler.SettingHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static com.github.genraven.genesys.constants.CommonConstants.ID_WITH_BRACKETS;
import static com.github.genraven.genesys.constants.SettingConstants.CURRENT;
import static com.github.genraven.genesys.constants.SettingConstants.SETTING_PATH;
@CrossOrigin(origins = "http://localhost:8080")
@Configuration
public class SettingRouter {

//    @Bean
//    RouterFunction<ServerResponse> settingRoutes(final SettingHandler settingHandler) {
//        return RouterFunctions.route().path(SettingConstants.SETTING_PATH, builder -> builder
//                .GET(ID_WITH_BRACKETS, settingHandler::getSettingById))
//                .GET(settingHandler::getAllSettings)
//                .POST(settingHandler::createSetting)
//                .build();
//    }
//
//    @Bean
//    RouterFunction<ServerResponse> currentSettingRoutes(final SettingHandler settingHandler) {
//        return RouterFunctions.route().path(CURRENT, builder -> builder
//                .GET(settingHandler::getCurrentSetting))
//                .build();
//    }

    @Bean
    RouterFunction<ServerResponse> currentSettingRoute(final SettingHandler settingHandler) {
        return RouterFunctions.route(RequestPredicates.GET(CURRENT), settingHandler::getCurrentSetting);
    }

    @Bean
    RouterFunction<ServerResponse> getAllSettings(final SettingHandler settingHandler) {
        return RouterFunctions.route(RequestPredicates.GET(SETTING_PATH), settingHandler::getAllSettings);
    }
}
