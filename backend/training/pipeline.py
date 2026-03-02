

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    manifest: Dict[str, str] = {}
    for dataset in datasets:
        path = kagglehub.dataset_download(dataset)
        manifest[dataset] = str(path)
        print(f"Downloaded {dataset} -> {path}")
    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2))
    return manifest


def export_clean(model: str) -> None:
    export_dir = MODELS_DIR / model / "cleaned"
    train_models.DATASET_PATHS = train_models.resolve_dataset_paths()
    train_models.export_clean_datasets(model, export_dir)
    print("Cleaned data written to:", export_dir)

def main() -> None:
    parser = argparse.ArgumentParser(description="Per-model training pipeline.")
    parser.add_argument("step", choices=["download", "clean", "train"])
    parser.add_argument(
        "--model",
        default="all",
        choices=[
            "all",
            "transaction_categorizer",
            "spending_forecaster",
            "budget_allocator",
            "goal_predictor",
            "anomaly_detector",
        ],
    )
    args = parser.parse_args()

    if args.step == "download":
        datasets = load_all_datasets() if args.model == "all" else load_model_datasets(args.model)
        if not datasets:
            raise SystemExit(f"No datasets configured for model '{args.model}'.")
        download_datasets(datasets)
        return

    if args.model == "all":
        models = [
            "transaction_categorizer",
            "spending_forecaster",
            "budget_allocator",
            "goal_predictor",
            "anomaly_detector",
        ]
    else:
        models = [args.model]

    if args.step == "clean":
        for model in models:
            export_clean(model)
        return

    if args.step == "train":
        for model in models:
            train_models.DATASET_PATHS = train_models.resolve_dataset_paths()
            train_models.run_training(model)
        return


if __name__ == "__main__":
    main()
