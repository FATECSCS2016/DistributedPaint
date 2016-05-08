package com.sd.server;

import java.awt.Graphics;
import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.Map;


interface RepositorioInterface extends Remote{
	void enviarPaint(Graphics pain)throws RemoteException;
	Map<Integer, Graphics>  receberPaintLista()throws RemoteException;
}
