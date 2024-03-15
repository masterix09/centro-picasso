import React, { FC } from "react";
import { Document, Page, View, Text } from "@react-pdf/renderer";
import { StyleSheet } from "@react-pdf/renderer";
import Header from "../common/Header";
import Footer from "../common/Footer";
import ParagraphText from "../common/ParagraphText";
// import moment from "moment";
import Paragraph from "../common/Paragraph";
import { IPagamento, IPrestazione } from "@/types";
import { EListino } from "@/enum/types";
import { format } from "date-fns";
import { TPagamentiPreventivo } from "@/app/(dashboard)/clinica/preventivo/columns";

const styles = StyleSheet.create({
  page: {
    padding: 15,
  },
  table: {
    // @ts-ignore
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },
  containerTotale: {
    width: "100%",
  },
  totaleText: {
    marginTop: 10,
    textAlign: "right",
    fontSize: 18,
    padding: 3,
    color: "#5a8ce8",
  },
  riepilogoContainer: {
    marginTop: "1rem",
  },
  riepilogoRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    textAlign: "right",
    // borderTop: "2px solid #eee",
    borderBottom: "2px solid #eee",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  riepilogoColSx: {
    width: "70%",
    textAlign: "right",
  },
  riepilogoColDx: {
    width: "20%",
    textAlign: "right",
    backgroundColor: "#eee",
  },
  riepilogoText: {
    fontSize: "1rem",
  },
});

const ResocontoPagamento: FC<{
  prestazioni: IPrestazione[] | null | undefined;
  totale: number;
  pagamenti: TPagamentiPreventivo[] | null | undefined;
  totaleAcconti: number;
  pianoCuraCreationDate: string;
  saldo: number;
  totaleEseguito: number;
  listino: EListino;
}> = ({
  prestazioni,
  totale,
  pagamenti,
  totaleAcconti,
  pianoCuraCreationDate,
  saldo,
  totaleEseguito,
  listino,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Header />
        <Paragraph
          // title={`Preventivo del ${moment(pianoCuraCreationDate).format(
          //   "DD MMM YYYY"
          // )}`}
          title={`Preventivo del ${format(new Date(), "dd MM yyyy")}`}
        >
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Prestazione</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Dente</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Importo</Text>
              </View>
            </View>
            {prestazioni?.map((item, idx) => {
              return (
                <View style={styles.tableRow} key={idx}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item.nome}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item.denteId}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {listino === EListino.DEFAULT
                        ? item.costoDefault
                        : item.costoGentile}{" "}
                      €
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={styles.containerTotale}>
            <Text style={styles.totaleText}>Importo {totale}€</Text>
          </View>
        </Paragraph>
        <Paragraph
          // title={`Dettaglio pagamenti al ${moment().format("DD/MM/YYYY")}`}
          title={`Dettaglio pagamenti al ${format(new Date(), "dd/MM/yyyy")}`}
        >
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Data</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Note</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Importo</Text>
              </View>
            </View>
            {pagamenti?.map((item, idx) => {
              return (
                <View style={styles.tableRow} key={idx}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item.createdAt}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item.note}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item.importo} €</Text>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={styles.containerTotale}>
            <Text style={styles.totaleText}>Totale {totaleAcconti} €</Text>
          </View>
        </Paragraph>
        <Paragraph title="Riepilogo">
          <View style={styles.riepilogoContainer}>
            <View style={styles.riepilogoRow}>
              <View style={styles.riepilogoColSx}>
                <Text>Prestazioni in preventivo</Text>
              </View>
              <View style={styles.riepilogoColDx}>
                <Text>{prestazioni?.length}</Text>
              </View>
            </View>
            <View style={styles.riepilogoRow}>
              <View style={styles.riepilogoColSx}>
                <Text>Totale importo preventivo</Text>
              </View>
              <View style={styles.riepilogoColDx}>
                <Text>{totale} €</Text>
              </View>
            </View>
            <View style={styles.riepilogoRow}>
              <View style={styles.riepilogoColSx}>
                <Text>Totale eseguito</Text>
              </View>
              <View style={styles.riepilogoColDx}>
                <Text>{totaleEseguito} €</Text>
              </View>
            </View>
            <View style={styles.riepilogoRow}>
              <View style={styles.riepilogoColSx}>
                <Text>Totale Acconti</Text>
              </View>
              <View style={styles.riepilogoColDx}>
                <Text>{totaleAcconti} €</Text>
              </View>
            </View>
            <View style={styles.riepilogoRow}>
              <View style={styles.riepilogoColSx}>
                <Text>Saldo</Text>
              </View>
              <View style={styles.riepilogoColDx}>
                <Text>{saldo} €</Text>
              </View>
            </View>
          </View>
        </Paragraph>
      </Page>
    </Document>
  );
};

export default ResocontoPagamento;
