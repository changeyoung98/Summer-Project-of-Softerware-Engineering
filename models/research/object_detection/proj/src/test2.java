import org.python.util.*;
import org.python.core.*;
public class test2 {
    public static void main(String[] args) {
        PythonInterpreter interpreter = new PythonInterpreter();
        interpreter.execfile("src/client.py");
        PyFunction function = (PyFunction) interpreter.get("main", PyFunction.class);
        PyObject pyobject = function.__call__(new PyString("192.168.1.198"), new PyInteger(6666),new PyString("e://query1.jpg"));
        System.out.println("anwser");
    }
}