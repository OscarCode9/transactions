import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';

@Resolver(() => Transaction)
export class TransactionResolver {
  
  constructor(private readonly transactionService: TransactionService) {}

  @Mutation(() => Transaction, { name: "create"})
  createTransaction(@Args('createTransactionInput') createTransactionInput: CreateTransactionInput) {
    return this.transactionService.create(createTransactionInput);
  }

  @Query(() => [Transaction], { name: 'findAll' })
  findAll() {
    return this.transactionService.findAll();
  }


  @Query(() => Transaction, { name: 'find' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.transactionService.findOne(id);
  }

  @Mutation(() => Transaction, { name: "update" })
  updateTransaction(@Args('updateTransactionInput') updateTransactionInput: UpdateTransactionInput) {
    return this.transactionService.update(updateTransactionInput.id, updateTransactionInput);
  }

  @Mutation(() => Transaction, { name: "remove" })
  removeTransaction(@Args('id', { type: () => Int }) id: number) {
    return this.transactionService.remove(id);
  }
}
