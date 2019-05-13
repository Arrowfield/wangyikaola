package org.field.example;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.field.dao.DB;

/**
 * Servlet implementation class AllCartHandle
 */
public class AllCartHandle extends BaseServlet {
	
	private static final long serialVersionUID = 1L;
       
    /**  
     * @see HttpServlet#HttpServlet()
     */
    public AllCartHandle() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	public void update(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		//操作修改
		
		String id = request.getParameter("id");
		
		String price = request.getParameter("price");
		
		String num = request.getParameter("num");
		
		HttpSession session = request.getSession();
		
		String tel = (String)session.getAttribute("tel");
		
		System.out.printf("%s,%s,%s",id,price,num);
		
		float sum = Float.parseFloat(price) * Float.parseFloat(num);
		
		DB db = new DB();
		
		String sql = "update t_khdgb set number = ? , sum = ?  where kid = ? and tel = ?";
		
		Object[] params = {num,sum,id,tel};
		
		boolean bool = db.executeUpdate(sql, params);
		
		System.out.print(bool);
		
		response.getWriter().append("Served at:update ").append(request.getContextPath());
	
	}
 
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	public void delete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		response.getWriter().append("Served at:delete ").append(request.getContextPath());
		
		//操作删除
		
		
	}

}