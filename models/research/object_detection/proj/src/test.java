import java.io.InputStreamReader;
import java.io.LineNumberReader;

public class test {

    public static void main(String[] args) {
        String result = "";

        try {
            Process process = Runtime.getRuntime().exec("python src/sender.py  --ip 192.168.1.198 --port 6666 --path e://query1.jpg" );
            InputStreamReader ir = new InputStreamReader(process.getInputStream(),"GBK");
            LineNumberReader input = new LineNumberReader(ir);
            result = input.readLine();
            input.close();
            ir.close();
//            process.waitFor();
        } catch (Exception e) {
            System.out.println("调用python脚本并读取结果时出错：" + e.getMessage());
        }

        System.out.println(result);

    }

}
