<form method="post" action="">
    <input name="submit_button" type="submit" value=" Truncate Table " />
</form>
<?php
 define("DB_USER","autUser");
 define("DB_PASSWORD","maninthemoon");
 define("DB_HOST","localhost");
 define("DB_NAME","autDB");
$dbc = @mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
OR die('Could not connect to MySQL: ' .
mysqli_connect_error());

// Create a query for the database
$query = "SELECT logID, href, mouseX, mouseY, TIMESTAMP FROM mousemove_table";

// Get a response from the database by sending the connection
// and the query
$response = @mysqli_query($dbc, $query);

// If the query executed properly proceed
if($response){

echo '<table align="left"
cellspacing="5" cellpadding="8">

<tr><td align="left"><b>ID</b></td>
<td align="left"><b>href</b></td>
<td align="left"><b>pageX</b></td>
<td align="left"><b>pageY</b></td>
<td align="left"><b>TIMESTAMP</b></td></tr>';

// mysqli_fetch_array will return a row of data from the query
// until no further data is available
while($row = mysqli_fetch_array($response)){

echo '<tr><td align="left">' . 
$row['logID'] . '</td><td align="left">' . 
$row['href'] . '</td><td align="left">' .
$row['mouseX'] . '</td><td align="left">' . 
$row['mouseY'] . '</td><td align="left">' .
$row['TIMESTAMP'] . '</td><td align="left">';

echo '</tr>';
}

echo '</table>';

} else {

echo "Couldn't issue database query<br />";

echo mysqli_error($dbc);

}

if(isset($_POST['submit_button']))
{
    mysqli_query($dbc, 'TRUNCATE TABLE `mousemove_table`');
    exit();
}
// Close connection to the database
mysqli_close($dbc);
?>