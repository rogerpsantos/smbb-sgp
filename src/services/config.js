var oracledb = require('oracledb');

const Conexao = () => {
oracledb.getConnection(
  {
    user          : "smbbdesenv",
    password      : "smbbdesenv",
    connectString : "192.168.200.10:1521/SMBB"
  },
  function(err, connection) {
    if (err) {
      console.error(err.message);
      return;
    }
    connection.execute(
      `SELECT 'TESTE'
       FROM dual`,
      [],  
      function(err, result) {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return;
        }
        console.log(result.rows);
        doRelease(connection);
      });
  });
 
function doRelease(connection) {
  connection.close(
    function(err) {
      if (err)
        console.error(err.message);
    });
}
}

export default Conexao;