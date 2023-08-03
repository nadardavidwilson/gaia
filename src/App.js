import React, { useState, useEffect } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import "./App.css"

function App() {

  const [employeeData, setEmployeeData] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [designation, setDesignation] = useState('');

  

  useEffect(() => {
    const savedEmployeeData = localStorage.getItem('employeeData');
    if (savedEmployeeData) {
      setEmployeeData(JSON.parse(savedEmployeeData));
    }
  }, []);


  const handleSubmit = () => {
    if (!employeeId || !name || !salary || !mobileNo || !designation) {
      alert('fill in all the fields.');
      return;
    }

    if (!/^\d{10}$/.test(mobileNo)) {
      alert('enter a valid mobile number.');
      return;
    }

    if (employeeId && name && salary && mobileNo && designation) {
      const newEmployee = {employeeId,name,salary,mobileNo,designation};
      setEmployeeData([...employeeData, newEmployee]);
      setEmployeeId('');
      setName('');
      setSalary('');
      setMobileNo('');
      setDesignation('');

      localStorage.setItem('employeeData', JSON.stringify([...employeeData, newEmployee]));
    }
  };

  return (
    <div className="App">
      <h1>Employee Details</h1>
      <div className='form'>
        <TextField label="Employee ID" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
        <TextField label="Mobile No" value={mobileNo} onChange={(e)=>setMobileNo(e.target.value)} />
        <TextField label="Designation" value={designation} onChange={(e) => setDesignation(e.target.value)} />
        <Button variant="contained" color="success" onClick={handleSubmit}>Submit</Button>
      </div>
      <br></br>
      <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Mobile No</TableCell>
              <TableCell>Designation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeData.map((employee, index) => (
              <TableRow key={index}>
                <TableCell>{employee.employeeId}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.salary}</TableCell>
                <TableCell>{employee.mobileNo}</TableCell>
                <TableCell>{employee.designation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
     
    </div>
  );
}

export default App;
