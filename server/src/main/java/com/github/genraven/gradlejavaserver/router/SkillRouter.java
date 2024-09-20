package com.github.genraven.gradlejavaserver.router;

import com.github.genraven.gradlejavaserver.handler.SkillHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class SkillRouter {

    @Bean
    public RouterFunction<ServerResponse> skillRouterMethod(final SkillHandler skillHandler) {
        return RouterFunctions.route()
                .path("/skills", builder -> builder
                        .GET("/", skillHandler::getAllSkills)
                        .POST("/{name}", skillHandler::createSkill)
                        .GET("/{name}", skillHandler::getSkill)
                        .PUT("/{name}", skillHandler::updateSkill))
                .build();
    }
}
