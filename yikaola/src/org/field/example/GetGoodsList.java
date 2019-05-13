package org.field.example;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.field.bean.Goods;
import org.field.dao.DB;


import net.sf.json.JSONObject;

/**
 * Servlet implementation class GetGoodsList
 */
public class GetGoodsList extends BaseServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetGoodsList() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public void handlePage(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		JSONObject json = new JSONObject();
		
		DB db = new DB();
		
		String sql = "select * from t_spb";
		
		db.doPstm(sql, null);
		
		ResultSet rs = db.getRs();
		
		//LinkedList<Object> myGoods = new LinkedList<Object>();
		
		List list = new ArrayList();
		
		try {
			
			ResultSetMetaData rsmd = rs.getMetaData();
			
			/*while(rs.next()) {
				
				Map m = new HashMap();
				
				for(int j = 1;j <= rsmd.getColumnCount();j++) {
					
					String colName = rsmd.getColumnName(j);
					
					System.out.print(colName);
					
					m.put(colName, rs.getString(colName));
				}
				
				list.add(m);
				
			}*/
			
			rs.last();
			
			int lastNumber = rs.getRow();
			
			for(int i = 0;i<lastNumber;i++) {
				
				Map m = new HashMap();
				
				/*Object[] obj = {
						
						rs.getObject(1),
						rs.getObject(2),
						rs.getObject(3),
						rs.getObject(4),
						rs.getObject(5),
						rs.getObject(6),
						rs.getObject(7),
						rs.getObject(8),
				};*/
				
				for(int j = 1;j <= rsmd.getColumnCount();j++) {
				
					String colName = rsmd.getColumnName(j);
					
					m.put(colName, rs.getString(colName));
				}
				
				list.add(m);
				
			}
			
			json.put("code", 200);
			
			json.put("data", list);
			
			response.getWriter().print(json.toString());
			
			//response.getWriter().append("Served at: page").append(request.getContextPath());
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
