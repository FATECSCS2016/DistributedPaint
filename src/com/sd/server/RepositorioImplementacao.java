package com.sd.server;

import java.awt.Graphics;
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.util.HashMap;
import java.util.Map;

public class RepositorioImplementacao extends UnicastRemoteObject implements RepositorioInterface{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int version;
	private Map<Integer, Graphics> paintLista;
	protected RepositorioImplementacao() throws RemoteException {
		super();
		version = 1;
		paintLista = new HashMap<Integer,Graphics>();
		// TODO Auto-generated constructor stub
	}

	@Override
	public void enviarPaint(Graphics paint) throws RemoteException {
		// TODO Auto-generated method stub
		paintLista.put(version,paint);
		version++;
	}

	@Override
	public Map<Integer, Graphics> receberPaintLista() throws RemoteException {
		// TODO Auto-generated method stub
		return  paintLista;
	}
	

}
