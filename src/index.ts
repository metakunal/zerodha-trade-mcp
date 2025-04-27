import { placeOrder } from "./trade";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "Demo",
  version: "1.0.0"
});

// Add an addition tool
server.tool("add-two-number",
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);

// Factorial of a number
server.tool("factorial-of-a-number",
    { a: z.number() },
    async ({ a }) => {
        let ans=1;
        for(let i=2;i<=a;i++){
            ans*=i;
        }
        return {
            content:[{type:"text",text:String(ans)}]
        }
    }
  );

  server.tool("buy-a-stock",
    {stock:z.string(),qty:z.number()},
    async({stock,qty})=>{
        placeOrder(stock,qty,"BUY");
        return {
            content:[{type:"text",text:"Stock has been bought"}]
        }
    }
  )

  server.tool("sell-a-stock",
    {stock:z.string(),qty:z.number()},
    async({stock,qty})=>{
        placeOrder(stock,qty,"SELL");
        return {
            content:[{type:"text",text:"Stock has been sold"}]
        }
    }
  )

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
try{
(async () => {
    await server.connect(transport);
    console.log("Connection Done")
  })();
}catch(e){
    console.log(e);
}
// placeOrder("HDFCBANK",1,"BUY");