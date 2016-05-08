package com.sd.server;

import java.rmi.Naming;
import java.rmi.registry.LocateRegistry;

public class Server {
	public static void main(String []args){
		System.out.println("Server iniciado!!!");
		new Server();
	}
	public Server(){
		try {
			RepositorioInterface repositorio = new RepositorioImplementacao();
			LocateRegistry.createRegistry(9999);
			Naming.rebind("rmi://localhost:9999/PaintServive", repositorio);
		}catch( Exception e ) { 
			System.out.println(" Erro: " +e );
		}
	}
}
