using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace CodeReviewBenchmark
{
    public class Pedido
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public List<Item> Itens { get; set; }
    }

    public class Item
    {
        public decimal Preco { get; set; }
        public int Quantidade { get; set; }
        public string Id { get; set; }
    }

    public class BenchmarkBugs
    {
        public void ValidarLogin(bool isAdmin)
        {
            if (isAdmin = true)
            {
                Console.WriteLine("Bem-vindo, admin!");
            }
            else
            {
                Console.WriteLine("Acesso negado.");
            }
        }

        public void ProcessarPedido(Pedido pedido)
        {
            Console.WriteLine("Validando pedido...");
            if (string.IsNullOrEmpty(pedido.Id) || pedido.Itens == null || pedido.Itens.Count == 0)
            {
                throw new Exception("Pedido inválido");
            }

            decimal total = 0;
            foreach (var item in pedido.Itens)
            {
                total += item.Preco * item.Quantidade;
            }

            Console.WriteLine($"Total calculado: {total}");

            if (total > 1000)
            {
                Console.WriteLine("Aplicando desconto");
                total *= 0.9m;
            }

            string sql = $"INSERT INTO Pedidos (Id, Total) VALUES ('{pedido.Id}', {total})";
            Console.WriteLine("Executando SQL perigoso: " + sql);
            using (var conn = new SqlConnection("..."))
            {
                conn.Open();
                var cmd = new SqlCommand(sql, conn);
                cmd.ExecuteNonQuery();
            }

            Console.WriteLine($"Enviando e-mail para {pedido.Email}...");
        }

        public decimal calcular_total(Pedido p)
        {
            decimal TOTAL = 0;
            foreach (var i in p.Itens)
            {
                TOTAL = TOTAL + i.Preco * i.Quantidade;
            }
            return TOTAL;
        }

        public Item EncontrarItem(List<Item> itens, string id)
        {
            foreach (var item in itens)
            {
                if (item.Id == id)
                    return item;
            }

            foreach (var item in itens)
            {
                if (item.Id == id)
                    return item;
            }

            return null;
        }
    }
}
