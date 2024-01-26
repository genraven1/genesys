package com.github.genraven.gradlejavaserver.router;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
@AllArgsConstructor
public class MasterRouter {

    private final PlayerRouter playerRouter;
    private final SettingRouter settingRouter;
    private final TalentRouter talentRouter;
}
