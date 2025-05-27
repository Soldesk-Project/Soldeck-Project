package org.joonzis.config;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.joonzis.domain.MemberVO;
import org.springframework.web.servlet.HandlerInterceptor;

public class AdminInterceptor implements HandlerInterceptor {
	@Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("loggedInUser") == null) {
            response.sendRedirect("/login");  // 로그인 페이지 경로
            return false;
        }

        MemberVO user = (MemberVO) session.getAttribute("loggedInUser");
        if (!"adminaccount".equals(user.getMem_id()) && !"admin1111".equals(user.getMem_id())) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "관리자만 접근 가능합니다.");
            return false;
        }
        return true;
    }
}
