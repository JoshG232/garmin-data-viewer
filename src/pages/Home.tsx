import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import Papa from "papaparse";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { Activity } from "../types/Activity";

const Home = () => {

    const [, setFileName] = useState<string | null>(null)
    const [tableResults, setTableResults] = useState<Activity[]>([])

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setFileName(file.name)

        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results: Papa.ParseResult<Activity>) => {
                const data = results.data as Activity[];
                console.log("Rows: ", results.data)
                setTableResults(data)

            },
            error: (error: Error) => console.error(error)
        })

    }
    return (
        <div className="flex flex-col h-dvh">

            <div className="grid grid-cols-2 p-2">
                <h1 className="font-bold text-2xl">Garmin Data Viewer</h1>
                <div className="flex flex-row-reverse">
                    <Input id="garminDataFile" type="file" accept=".csv" onChange={handleFileChange}></Input>
                </div>
            </div>
            <div className="flex flex-col p-2 h-dvh">
                <div className="p-2 overflow-auto h-1/2">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Activity Type</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Title</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {tableResults.map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell>{row["Activity Type"]}</TableCell>
                                    <TableCell>{row["Date"]}</TableCell>
                                    <TableCell>{row["Title"]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="grid grid-cols-3 p-2 overflow-auto">
                    <div className="bg-amber-500">Hello</div>
                    <div className="bg-amber-500">Hello</div>
                    <div className="bg-amber-500">Hello</div>
                </div>
            </div>

        </div>
    )
}

export default Home;