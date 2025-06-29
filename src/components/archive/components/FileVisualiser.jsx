import React, { useEffect } from "react";

export default function FileVisualiser({ file }) {
  // submit state
  const [excelData, setExcelData] = useState(null);
  useEffect(() => {
    const handleFile = () => {
      let fileTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
      ];
      let selectedFile = file;
      if (selectedFile) {
        if (selectedFile && fileTypes.includes(selectedFile.type)) {
          setTypeError(null);
          let reader = new FileReader();
          reader.readAsArrayBuffer(selectedFile);
          reader.onload = (e) => {
            setExcelFile(e.target.result);
          };
        } else {
          setTypeError("Please select only excel file types");
          setExcelFile(null);
        }
      } else {
        console.log("Please select your file");
      }
    };
    handleFile();
  }, []);

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            {Object.keys(excelData[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {excelData.map((individualExcelData, index) => (
            <tr key={index}>
              {Object.keys(individualExcelData).map((key) => (
                <td key={key}>{individualExcelData[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
