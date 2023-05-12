import { Injectable } from '@nestjs/common';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { Transaction as Trx, } from '@prisma/client';
import { Transaction } from './entities/transaction.entity';
import { PrismaService } from '../prisma.service';


@Injectable()
export class TransactionService {

  constructor(private prisma: PrismaService) {}

  async create(createTransactionInput: CreateTransactionInput): Promise<Transaction | null> {
    console.log(createTransactionInput)
    function createFakeTransaction() {
      const transaction = {
        transactionExternalId: generateRandomId(),
        accountExternalIdDebit: generateRandomId(),
        accountExternalIdCredit: generateRandomId(),
        tranferTypeId: generateRandomNumber(),
        value: generateRandomNumber(),
        transactionType: generateRandomWord(),
        transactionStatus: generateRandomWord(),
        createdAt: generateRandomDate(),
      };
    
      return transaction;
    }
    
    function generateRandomId() {
      // Genera un ID único, por ejemplo utilizando un algoritmo como cuid()
      // Puedes implementar tu propio generador de IDs únicos
      return 'fake-id-' + Math.random().toString(36).substring(7);
    }
    
    function generateRandomNumber() {
      // Genera un número aleatorio
      return Math.floor(Math.random() * 1000);
    }
    
    function generateRandomWord() {
      // Genera una palabra aleatoria
      return Math.random().toString(36).substring(7);
    }
    
    function generateRandomDate() {
      // Genera una fecha aleatoria en el rango de los últimos 10 años
      const currentDate = new Date();
      const startDate = new Date(
        currentDate.getFullYear() - 10,
        currentDate.getMonth(),
        currentDate.getDate(),
      );
      const endDate = new Date();
      const randomTimestamp =
        startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime());
    
      return new Date(randomTimestamp);
    }
    
    const transaction = createFakeTransaction();
    console.log(transaction)
    const result = await this.prisma.transaction.create({
      data: transaction,
    });

    const response: Transaction = {
      accountExternalIdDebit: result.accountExternalIdDebit,
      accountExternalIdCredit: result.accountExternalIdCredit,
      tranferTypeId: result.tranferTypeId,
      value: result.value,
      transactionExternalId: result.transactionExternalId,
      transactionType: result.transactionType,
      transactionStatus: result.transactionStatus,
    };

    return response;
  }

  findAll() {
    return `This action returns all transaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionInput: UpdateTransactionInput) {
    return updateTransactionInput;
  }

  remove(id: number) {
    console.log('remove');
    return {
      status: 'ok',
      id,
    };
  }
}
