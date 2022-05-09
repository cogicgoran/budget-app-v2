const receiptsRepository = require("../Repositories/receipts.repository");

class ReceiptsService {
  constructor(receiptsRepository) {
    this.receiptsRepository = receiptsRepository;
  }

  getAllReceipts = async () => {
    const receipts = await this.receiptsRepository.getAllReceipts();
    return receipts;
  };

  getLatestReceipts = async () => {
    const receipts = await this.receiptsRepository.getLatestReceipts();
    return receipts;
  };

  getMonthReceipts = async () => {
    const receipts = await this.receiptsRepository.getMonthReceipts();
    return receipts;
  };

  getReceiptById = async (id) => {
    const receipt = await this.receiptsRepository.getReceiptById(id);
    return receipt;
  };

  insertReceipt = async (body) => {
    const result = await this.receiptsRepository.insertReceipt(body);
    return result;
  };

  updateReceipt = async (body) => {
    const jsonString = JSON.stringify(body.receipt);
    const result = await this.receiptsRepository.updateReceipt(
      body,
      jsonString
    );
    return result;
  };
}

module.exports = new ReceiptsService(receiptsRepository);
