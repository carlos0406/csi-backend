import { IShoppingListRepository } from '../domain/shopping_list.repository.interface';
import * as XLSX from 'xlsx';

export class ExportDetailedShoppingListToExcelUsecase {
  constructor(private readonly repository: IShoppingListRepository) {}

  async execute(purchaseId: string): Promise<Buffer> {
    try {
      const shoppingLists =
        await this.repository.searchByPurchaseId(purchaseId);
      if (!shoppingLists || shoppingLists.length === 0) {
        throw new Error('No shopping lists found for this purchase');
      }

      // Criar workbook
      const workbook = XLSX.utils.book_new();

      // Processar cada shopping list
      for (const shoppingList of shoppingLists) {
        // Buscar detalhes completos da shopping list
        const detailedShoppingList = await this.repository.findById(
          shoppingList.id,
        );

        if (!detailedShoppingList || !detailedShoppingList.items) {
          continue;
        }

        // Preparar dados para a planilha desta shopping list
        const worksheetData = detailedShoppingList.items.map((item, index) => {
          const unitPriceInDollars = (item.unit_price || 0) / 100;
          const totalPriceInDollars = item.quantity * unitPriceInDollars;

          return {
            '#': index + 1,
            'Card Name': item.card.name,
            Rarity: item.rarity?.name || 'N/A',
            Collection: item.collection,
            Quantity: item.quantity,
            'Unit Price': `$ ${unitPriceInDollars.toFixed(2)}`,
            'Total Price': `$ ${totalPriceInDollars.toFixed(2)}`,
          };
        });

        // Adicionar linha de total no final
        const totalQuantity = detailedShoppingList.items.reduce(
          (sum, item) => sum + item.quantity,
          0,
        );
        const totalValue = detailedShoppingList.items.reduce(
          (sum, item) => sum + item.quantity * ((item.unit_price || 0) / 100),
          0,
        );

        worksheetData.push({
          '#': 'TOTAL' as any,
          'Card Name': 'TOTAL',
          Rarity: '',
          Collection: '',
          Quantity: totalQuantity,
          'Unit Price': '' as any,
          'Total Price': `$ ${totalValue.toFixed(2)}`,
        });

        // Criar worksheet
        const worksheet = XLSX.utils.json_to_sheet(worksheetData);

        // Configurar largura das colunas
        const columnWidths = [
          { wch: 5 }, // #
          { wch: 35 }, // Card Name
          { wch: 15 }, // Rarity
          { wch: 20 }, // Collection
          { wch: 10 }, // Quantity
          { wch: 12 }, // Unit Price
          { wch: 12 }, // Total Price
        ];
        worksheet['!cols'] = columnWidths;

        // Nome da aba: Usuario + ID da shopping list (limitado a 31 caracteres)
        const userName = shoppingList.user.name || 'Unknown User';
        const shortId = shoppingList.id.substring(0, 8);
        let sheetName = `${userName} - ${shortId}`;

        // Limitar o nome da aba a 31 caracteres (limite do Excel)
        if (sheetName.length > 31) {
          sheetName = sheetName.substring(0, 28) + '...';
        }

        // Garantir que o nome da aba seja único
        let finalSheetName = sheetName;
        let counter = 1;
        while (workbook.SheetNames.includes(finalSheetName)) {
          const suffix = ` (${counter})`;
          const maxLength = 31 - suffix.length;
          finalSheetName = sheetName.substring(0, maxLength) + suffix;
          counter++;
        }

        // Adicionar worksheet ao workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, finalSheetName);
      }

      // Se não há worksheets, criar uma aba vazia
      if (workbook.SheetNames.length === 0) {
        const emptyWorksheet = XLSX.utils.json_to_sheet([
          { Message: 'No shopping lists with items found' },
        ]);
        XLSX.utils.book_append_sheet(workbook, emptyWorksheet, 'No Data');
      }

      // Converter para buffer
      const buffer = XLSX.write(workbook, {
        type: 'buffer',
        bookType: 'xlsx',
      });

      return buffer;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to export detailed shopping lists to Excel: ${error.message}`,
        );
      } else {
        throw new Error(
          'Failed to export detailed shopping lists to Excel: Unknown error',
        );
      }
    }
  }
}
