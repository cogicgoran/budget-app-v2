const receiptsRepository = require('../Repositories/receipts.repository');

class ReceiptsService {
  constructor(receiptsRepository) {
    this.receiptsRepository = receiptsRepository;
  }

  getAllReceipts = async () => {
    try {
      const receipts = await this.receiptsRepository.getAllReceipts();
      return receipts;
    } catch (error) {
      // FIX: handle error accordingly
    }
  };

  getLatestReceipts = async () => {
    try {
      const receipts = await this.receiptsRepository.getLatestReceipts();
      return receipts;
    } catch (error) {
      // FIX: handle error accordingly
    }
  };

  getMonthReceipts = async () => {
    try {
      const receipts = await this.receiptsRepository.getMonthReceipts();
      return receipts;
    } catch (error) {
      // FIX: handle error accordingly
    }
  };

  getReceiptById = async (id) => {
    try {
      const receipt = await this.receiptsRepository.getReceiptById(id);
      return receipt;
    } catch (error) {
      // FIX: handle error accordingly
    }
  };

  insertReceipt = async (body) => {
    try {
      const result = await this.receiptsRepository.insertReceipt(body);
      return result;
    } catch (error) {
      // FIX: handle error accordingly
    }
  };

  updateReceipt = async (body) => {
      const jsonString = JSON.stringify(body.receipt);
    try {
      const result = await this.receiptsRepository.updateReceipt(body, jsonString);
      return result;
    } catch (error) {
      // FIX: handle error accordingly
    }
  };
}

module.exports = new ReceiptsService(receiptsRepository);
