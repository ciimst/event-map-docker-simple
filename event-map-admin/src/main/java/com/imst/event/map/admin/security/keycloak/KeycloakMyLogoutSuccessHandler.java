package com.imst.event.map.admin.security.keycloak;

import java.io.IOException;
import java.util.LinkedHashMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import com.imst.event.map.admin.constants.LogTypeE;
import com.imst.event.map.admin.security.UserItemDetails;
import com.imst.event.map.admin.services.DBLogger;
import com.imst.event.map.admin.utils.ApplicationContextUtils;

@Component
public class KeycloakMyLogoutSuccessHandler implements LogoutSuccessHandler {

	private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

	@Override
	public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
			throws IOException, ServletException {

		
		HttpSession session = request.getSession();
		if (session != null) {
			
			try {
				UserItemDetails userItemDetails = (UserItemDetails) authentication.getPrincipal();		
	
				LinkedHashMap<String, Object> logMap = new LinkedHashMap<>();
				logMap.put("çıkış", "admin paneli");
				logMap.put("id", userItemDetails.getUserId());
				logMap.put("username", userItemDetails.getUsername());
	
				DBLogger dbLogger = ApplicationContextUtils.getBean(DBLogger.class);
				dbLogger.logWithUser(userItemDetails, logMap, LogTypeE.LOGOUT);
			} catch (Exception e) {
				
				redirectStrategy.sendRedirect(request, response, "/login");
				return;
			}
		}

		redirectStrategy.sendRedirect(request, response, "/login");
	}
}



