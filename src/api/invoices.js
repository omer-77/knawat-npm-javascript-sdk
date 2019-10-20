export default {
  getInvoices() {
    return this.$fetch('GET', '/invoices');
  }
};
