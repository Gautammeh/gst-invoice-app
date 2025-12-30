

const tbody = document.getElementById("items");
        for (let i = 1; i <= 9; i++) {
          tbody.innerHTML += `
        <tr>
          <td class="center">${i}</td>
          <td><input></td>
          <td><input></td>
          <td><input></td>
          <td><input type="number"></td>
          <td><input type="number"></td>
          <td><input type="number"></td>
        </tr>`;
        }

        function numberToWords(num) {
          if (num === 0) return "Zero";
        
          const ones = [
            "", "One", "Two", "Three", "Four", "Five", "Six",
            "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
            "Thirteen", "Fourteen", "Fifteen", "Sixteen",
            "Seventeen", "Eighteen", "Nineteen"
          ];
        
          const tens = [
            "", "", "Twenty", "Thirty", "Forty",
            "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
          ];
        
          function twoDigit(n) {
            if (n < 20) return ones[n];
            return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
          }
        
          function threeDigit(n) {
            let str = "";
            if (n >= 100) {
              str += ones[Math.floor(n / 100)] + " Hundred";
              n %= 100;
              if (n) str += " ";
            }
            if (n) str += twoDigit(n);
            return str;
          }
        
          let result = "";
        
          if (num >= 10000000) {
            result += threeDigit(Math.floor(num / 10000000)) + " Crore ";
            num %= 10000000;
          }
        
          if (num >= 100000) {
            result += threeDigit(Math.floor(num / 100000)) + " Lakh ";
            num %= 100000;
          }
        
          if (num >= 1000) {
            result += threeDigit(Math.floor(num / 1000)) + " Thousand ";
            num %= 1000;
          }
        
          if (num > 0) {
            result += threeDigit(num);
          }
        
          return result.trim();
        }

        document.addEventListener("DOMContentLoaded", () => {
          renderSavedBills();
        });

document.getElementById("finalTotal").addEventListener("input", e => {
    const value = Math.floor(e.target.value || 0);
    document.getElementById("amountWords").value =
      numberToWords(value) + " Only";
  });
  
  window.addEventListener("beforeprint", () => {
    saveInvoice();
  });
  
  function getAllInvoices() {
    return JSON.parse(localStorage.getItem("invoices")) || [];
  }
  
  function saveInvoice() {
    const inputs = document.querySelectorAll("input");
    const data = {};
  
    inputs.forEach((inp, i) => {
      data[i] = inp.value;
    });
  
    const invoiceMeta = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      data
    };
  
    const invoices = getAllInvoices();
    invoices.unshift(invoiceMeta); // latest on top
  
    localStorage.setItem("invoices", JSON.stringify(invoices));
    renderSavedBills();
  
    alert("Invoice saved");
  }
  
  function loadInvoice(id) {
    const invoices = getAllInvoices();
    const invoice = invoices.find(i => i.id === id);
    if (!invoice) return;
  
    const inputs = document.querySelectorAll("input");
    inputs.forEach((inp, i) => {
      if (invoice.data[i] !== undefined) {
        inp.value = invoice.data[i];
      }
    });
  }

function renderSavedBills() {
  const list = document.getElementById("savedBills");
  const invoices = getAllInvoices();
  list.innerHTML = "";

  invoices.forEach(inv => {
    const li = document.createElement("li");
    li.textContent = `Invoice – ${inv.date}`;
    li.onclick = () => loadInvoice(inv.id);
    list.appendChild(li);
  });
}
function toggleSaved() {
  document.getElementById("savedPanel").classList.toggle("open");
}
