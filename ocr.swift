import Foundation
import Vision
import AppKit

let args = CommandLine.arguments
guard args.count > 1 else { exit(1) }

let imgPath = args[1]
let url = URL(fileURLWithPath: imgPath)
guard let image = NSImage(contentsOf: url),
      let cgImage = image.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    exit(1)
}

let request = VNRecognizeTextRequest()
request.recognitionLevel = .accurate

let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
try? handler.perform([request])

if let results = request.results {
    for obs in results {
        if let cand = obs.topCandidates(1).first {
            print(cand.string)
        }
    }
}
